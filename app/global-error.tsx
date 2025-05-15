"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="bg-gradient-to-b from-[#1a1040] to-[#0c1a4d] text-white">
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-600">
              Erro Fatal
            </h1>

            <div className="relative h-40 w-40 mx-auto my-8">
              {/* Círculos animados para efeito visual */}
              <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full bg-red-500/30 animate-pulse delay-75"></div>
              <div className="absolute inset-8 rounded-full bg-purple-500/20 animate-pulse delay-150"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ocorreu um erro crítico
            </h2>

            <p className="text-gray-300 mb-8">
              Encontramos um problema grave que impediu o carregamento da aplicação. Nossa
              equipe foi notificada e está trabalhando para resolver o problema o mais
              rápido possível.
              {error.digest && (
                <span className="block mt-2 text-sm text-gray-400">
                  Código de erro: {error.digest}
                </span>
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Tentar novamente
              </button>

              <Link
                href="/"
                className="px-6 py-3 border border-purple-500 text-white font-medium rounded-lg hover:bg-purple-500/10 transition-all inline-flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Voltar para a página inicial
              </Link>
            </div>
          </div>

          {/* Estrelas de fundo simples sem animação para evitar problemas */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </body>
    </html>
  );
}
