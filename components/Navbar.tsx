"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if the screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Call on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle scroll events for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle intersection observer for sections - memoizado para evitar recriações
  const setupIntersectionObserver = useCallback(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);

            // Atualizar URL com hash para melhor SEO e compartilhamento
            const url = new URL(window.location.href);
            url.hash = `#${entry.target.id}`;
            window.history.replaceState({}, "", url);
          }
        });
      },
      {
        threshold: 0.1, // Lower threshold to detect sections earlier
        rootMargin: "-100px 0px -100px 0px", // Adjust top and bottom margins
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    const cleanup = setupIntersectionObserver();
    return cleanup;
  }, [setupIntersectionObserver]);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);

      // Atualizar URL com hash para melhor SEO e compartilhamento
      const url = new URL(window.location.href);
      url.hash = `#${id}`;
      window.history.replaceState({}, "", url);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050816]/90 backdrop-blur-md py-2 shadow-md"
          : "bg-[#050816]/80 backdrop-blur-sm py-4"
      }`}
      aria-label="Main navigation">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            aria-label="Gomes App - Home">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex space-x-8`} role="navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-base font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-white border-b-2 border-purple-500"
                    : "text-gray-400 hover:text-white"
                } focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#050816] rounded px-2 py-1`}
                aria-current={activeSection === link.id ? "page" : undefined}>
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-md p-1"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full bg-[#0a0a1e]/95 backdrop-blur-sm py-4 animate-fade-in-down shadow-lg"
          role="navigation">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`py-2 text-base font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-white border-l-4 border-purple-500 pl-4"
                    : "text-gray-400 hover:text-white pl-4"
                } focus:outline-none focus:ring-2 focus:ring-purple-400 rounded`}
                aria-current={activeSection === link.id ? "page" : undefined}>
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
