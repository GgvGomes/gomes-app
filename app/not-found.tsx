"use client";

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada | Gomes App",
  description: "A página que você está procurando não foi encontrada.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-[#1a1040] to-[#0c1a4d]">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          404
        </h1>

        <div className="relative h-40 w-40 mx-auto my-8">
          {/* Círculos animados para efeito visual */}
          <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping"></div>
          <div className="absolute inset-4 rounded-full bg-purple-500/30 animate-pulse"></div>
          <div className="absolute inset-8 rounded-full bg-blue-500/20 animate-pulse delay-75"></div>
          <div className="absolute inset-12 rounded-full bg-blue-500/30 animate-ping delay-100"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Página não encontrada
        </h2>

        <p className="text-gray-300 mb-8">
          Ops! Parece que você se perdeu no espaço. A página que você está procurando não
          existe ou foi movida para outra galáxia.
        </p>

        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity inline-flex items-center focus:ring-2 focus:ring-purple-400 focus:outline-none">
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

      {/* Estrelas de fundo */}
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
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ${
                Math.random() * 5
              }s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
