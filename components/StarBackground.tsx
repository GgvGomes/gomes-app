"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  z: number
  size: number
  opacity: number
  speed: number
  color: string
  twinkleSpeed: number
  twinkleFactor: number
  reset: () => void
  getStarColor: () => string
  twinkle: () => number
  update: () => void
  draw: () => void
}

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    // Initial size
    setCanvasSize()

    // Update canvas size when window is resized
    window.addEventListener("resize", setCanvasSize)

    // Star properties
    const stars: Star[] = []
    const count = 250 // Número de estrelas

    // Star class
    class StarImpl implements Star {
      x: number
      y: number
      z: number
      size: number
      opacity: number
      speed: number
      color: string
      twinkleSpeed: number
      twinkleFactor: number

      constructor() {
        this.x = 0
        this.y = 0
        this.z = 0
        this.size = 0
        this.opacity = 0
        this.speed = 0
        this.color = ""
        this.twinkleSpeed = 0
        this.twinkleFactor = 0
        this.reset()
      }

      reset() {
        if (!canvas) return

        // Distribuir as estrelas aleatoriamente por toda a tela
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height

        // Profundidade aleatória entre 1 e 2000 para maior variação
        this.z = Math.random() * 2000 + 1

        // Tamanho reduzido para estrelas menores
        this.size = Math.random() * 1.2 + 0.1

        // Opacidade reduzida para brilho mais suave
        this.opacity = Math.random() * 0.5 + 0.1

        // Velocidade variada para movimento mais natural
        this.speed = Math.random() * 0.4 + 0.1

        this.color = this.getStarColor()

        // Velocidade de cintilação mais lenta para efeito mais sutil
        this.twinkleSpeed = Math.random() * 0.02 + 0.005

        // Fator inicial aleatório para evitar que todas cintilam juntas
        this.twinkleFactor = Math.random() * Math.PI * 2
      }

      getStarColor() {
        // Paleta de cores expandida que combina com o tema azul/roxo do site
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
          "rgba(255, 223, 186, ", // Amarelo pêssego (para estrelas mais quentes)
          "rgba(255, 192, 203, ", // Rosa claro
          "rgba(64, 224, 208, ", // Turquesa
          "rgba(175, 238, 238, ", // Azul turquesa claro
        ]

        // Adiciona uma pequena chance de estrelas mais brilhantes em cores específicas
        if (Math.random() > 0.95) {
          return [
            "rgba(255, 255, 255, ", // Branco brilhante
            "rgba(200, 200, 255, ", // Azul brilhante
            "rgba(255, 223, 186, ", // Amarelo brilhante
          ][Math.floor(Math.random() * 3)]
        }

        return colors[Math.floor(Math.random() * colors.length)]
      }

      twinkle() {
        this.twinkleFactor += this.twinkleSpeed
        // Amplitude de cintilação reduzida para efeito mais sutil
        const twinkleValue = Math.sin(this.twinkleFactor) * 0.2 + 0.8
        return this.opacity * twinkleValue
      }

      update() {
        // Move star effect
        this.z -= this.speed

        // Reset star if it gets too close
        if (this.z <= 0) {
          this.reset()
          // Reposicionar no fundo do espaço quando reiniciar
          this.z = 2000
        }
      }

      draw() {
        if (!canvas || !ctx) return

        // Fator de escala reduzido para efeito de profundidade mais sutil
        const scaleFactor = 3
        const cx = canvas.width / 2
        const cy = canvas.height / 2

        // Calculate screen position with perspective
        const x = (this.x - cx) * (scaleFactor / this.z) + cx
        const y = (this.y - cy) * (scaleFactor / this.z) + cy

        // Only draw if within bounds
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          // Size proportional to depth - reduzido para estrelas menores
          const sizeFactor = 1 - this.z / 2000
          const finalSize = this.size * sizeFactor * 2

          // Opacity effect
          const finalOpacity = this.twinkle()

          // Draw the star
          ctx.beginPath()
          ctx.fillStyle = `${this.color}${finalOpacity})`
          ctx.arc(x, y, finalSize, 0, Math.PI * 2)
          ctx.fill()

          // Efeito de brilho reduzido e apenas para estrelas maiores
          if (finalSize > 0.8 && Math.random() > 0.7) {
            ctx.beginPath()
            ctx.fillStyle = `${this.color}${finalOpacity * 0.3})`
            ctx.arc(x, y, finalSize * 1.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }

    // Create stars with staggered initialization
    for (let i = 0; i < count; i++) {
      const star = new StarImpl()
      // Inicializar com profundidades variadas para evitar que todas comecem do mesmo ponto
      star.z = Math.random() * 2000 + 1
      stars.push(star)
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas with slight opacity to create trail effect
      ctx.fillStyle = "rgba(5, 8, 22, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw stars
      stars.forEach((star) => {
        star.update()
        star.draw()
      })

      // Continue animation
      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", setCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[#050816]" />
}

export default StarBackground
