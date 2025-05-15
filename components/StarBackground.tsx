"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  twinkleSpeed: number;
  twinkleFactor: number;
  reset: () => void;
  getStarColor: () => string;
  twinkle: () => number;
  update: () => void;
  draw: () => void;
}

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar dispositivos móveis para otimização
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // Otimização: desativar alpha para melhor performance
    if (!ctx) return;

    // Set canvas size com devicePixelRatio para telas de alta resolução
    const setCanvasSize = () => {
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Definir tamanho lógico do canvas
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        // Escalar o contexto
        ctx.scale(dpr, dpr);

        // Redefinir o estilo CSS
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
    };

    // Initial size
    setCanvasSize();

    // Update canvas size when window is resized
    window.addEventListener("resize", setCanvasSize);

    // Star properties - reduzir em dispositivos móveis para melhor performance
    const stars: Star[] = [];
    const count = isMobile ? 150 : 250; // Menos estrelas em dispositivos móveis

    // Otimização: Pré-calcular valores comuns
    const TWO_PI = Math.PI * 2;

    // Star class
    class StarImpl implements Star {
      x: number;
      y: number;
      z: number;
      size: number;
      opacity: number;
      speed: number;
      color: string;
      twinkleSpeed: number;
      twinkleFactor: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.size = 0;
        this.opacity = 0;
        this.speed = 0;
        this.color = "";
        this.twinkleSpeed = 0;
        this.twinkleFactor = 0;
        this.reset();
      }

      reset() {
        if (!canvas) return;

        // Distribuir as estrelas aleatoriamente por toda a tela
        this.x = Math.random() * (canvas.width / (window.devicePixelRatio || 1));
        this.y = Math.random() * (canvas.height / (window.devicePixelRatio || 1));

        // Profundidade aleatória entre 1 e 2000 para maior variação
        this.z = Math.random() * 2000 + 1;

        // Tamanho reduzido para estrelas menores
        this.size = Math.random() * 1.2 + 0.1;

        // Opacidade reduzida para brilho mais suave
        this.opacity = Math.random() * 0.5 + 0.1;

        // Velocidade variada para movimento mais natural
        this.speed = Math.random() * 0.4 + 0.1;

        this.color = this.getStarColor();

        // Velocidade de cintilação mais lenta para efeito mais sutil
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;

        // Fator inicial aleatório para evitar que todas cintilam juntas
        this.twinkleFactor = Math.random() * TWO_PI;
      }

      getStarColor() {
        // Paleta de cores expandida que combina com o tema roxo/azul do site
        const colors = [
          "rgba(255, 255, 255, ", // Branco puro
          "rgba(230, 230, 255, ", // Branco azulado
          "rgba(176, 196, 222, ", // Azul claro
          "rgba(173, 216, 230, ", // Azul céu
          "rgba(135, 206, 235, ", // Azul céu mais intenso
          "rgba(147, 112, 219, ", // Roxo médio
          "rgba(138, 43, 226, ", // Violeta
          "rgba(221, 160, 221, ", // Roxo claro
          "rgba(186, 85, 211, ", // Roxo médio
          "rgba(123, 104, 238, ", // Azul-violeta
          "rgba(106, 90, 205, ", // Azul-violeta escuro
          "rgba(72, 61, 139, ", // Azul-violeta muito escuro
          "rgba(65, 105, 225, ", // Azul real
        ];

        // Adiciona uma pequena chance de estrelas mais brilhantes em cores específicas
        if (Math.random() > 0.95) {
          return [
            "rgba(255, 255, 255, ", // Branco brilhante
            "rgba(200, 200, 255, ", // Azul brilhante
            "rgba(180, 180, 255, ", // Azul-violeta brilhante
          ][Math.floor(Math.random() * 3)];
        }

        return colors[Math.floor(Math.random() * colors.length)];
      }

      twinkle() {
        this.twinkleFactor += this.twinkleSpeed;
        // Amplitude de cintilação reduzida para efeito mais sutil
        const twinkleValue = Math.sin(this.twinkleFactor) * 0.2 + 0.8;
        return this.opacity * twinkleValue;
      }

      update() {
        // Move star effect
        this.z -= this.speed;

        // Reset star if it gets too close
        if (this.z <= 0) {
          this.reset();
          // Reposicionar no fundo do espaço quando reiniciar
          this.z = 2000;
        }
      }

      draw() {
        if (!canvas || !ctx) return;

        // Fator de escala reduzido para efeito de profundidade mais sutil
        const scaleFactor = 3;
        const cx = canvas.width / (window.devicePixelRatio || 1) / 2;
        const cy = canvas.height / (window.devicePixelRatio || 1) / 2;

        // Calculate screen position with perspective
        const x = (this.x - cx) * (scaleFactor / this.z) + cx;
        const y = (this.y - cy) * (scaleFactor / this.z) + cy;

        // Only draw if within bounds
        if (
          x >= 0 &&
          x <= canvas.width / (window.devicePixelRatio || 1) &&
          y >= 0 &&
          y <= canvas.height / (window.devicePixelRatio || 1)
        ) {
          // Size proportional to depth - reduzido para estrelas menores
          const sizeFactor = 1 - this.z / 2000;
          const finalSize = this.size * sizeFactor * 2;

          // Opacity effect
          const finalOpacity = this.twinkle();

          // Draw the star
          ctx.beginPath();
          ctx.fillStyle = `${this.color}${finalOpacity})`;
          ctx.arc(x, y, finalSize, 0, TWO_PI);
          ctx.fill();

          // Efeito de brilho reduzido e apenas para estrelas maiores
          if (finalSize > 0.8 && Math.random() > 0.7) {
            ctx.beginPath();
            ctx.fillStyle = `${this.color}${finalOpacity * 0.3})`;
            ctx.arc(x, y, finalSize * 1.5, 0, TWO_PI);
            ctx.fill();
          }
        }
      }
    }

    // Create stars with staggered initialization
    for (let i = 0; i < count; i++) {
      const star = new StarImpl();
      // Inicializar com profundidades variadas para evitar que todas comecem do mesmo ponto
      star.z = Math.random() * 2000 + 1;
      stars.push(star);
    }

    // Otimização: Usar requestAnimationFrame com throttling
    let lastTime = 0;
    const fps = 30; // Limitar a 30 FPS para economizar recursos
    const fpsInterval = 1000 / fps;

    // Animation loop
    let animationId: number;
    const animate = (currentTime: number) => {
      if (!ctx || !canvas) return;

      animationId = requestAnimationFrame(animate);

      // Calcular tempo decorrido
      const elapsed = currentTime - lastTime;

      // Limitar taxa de quadros
      if (elapsed < fpsInterval) return;

      // Atualizar lastTime
      lastTime = currentTime - (elapsed % fpsInterval);

      // Limpar completamente o canvas a cada frame para eliminar os rastros
      ctx.clearRect(
        0,
        0,
        canvas.width / (window.devicePixelRatio || 1),
        canvas.height / (window.devicePixelRatio || 1)
      );

      // Update and draw stars
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
    };

    // Start animation
    animationId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[transparent]"
      aria-hidden="true" // Acessibilidade: indicar que é decorativo
    />
  );
};

export default StarBackground;
