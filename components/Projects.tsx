"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  technologies: string[];
  description: string;
  link: string;
  github: string;
  featured?: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Memoizar a função de busca para evitar recriações desnecessárias
  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);

      // Em vez de tentar carregar um arquivo JSON externo, usamos dados estáticos
      // Isso evita o erro de carregamento do arquivo JSON
      const fallbackProjects = [
        {
          id: 1,
          title: "E-Commerce Website",
          category: "web",
          image: "/placeholder.svg?height=192&width=384",
          technologies: ["React", "Node.js", "MongoDB"],
          description:
            "Full-featured e-commerce platform with product catalog, cart, and payment integration.",
          link: "#",
          github: "https://github.com/",
          featured: true,
        },
        {
          id: 2,
          title: "Task Management App",
          category: "mobile",
          image: "/placeholder.svg?height=192&width=384",
          technologies: ["React Native", "Firebase"],
          description:
            "A mobile app for task organization with real-time updates and notifications.",
          link: "#",
          github: "https://github.com/",
          featured: true,
        },
        {
          id: 3,
          title: "Portfolio Website",
          category: "web",
          image: "/placeholder.svg?height=192&width=384",
          technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
          description: "A responsive portfolio website showcasing projects and skills.",
          link: "#",
          github: "https://github.com/",
          featured: false,
        },
        {
          id: 4,
          title: "Weather Dashboard",
          category: "web",
          image: "/placeholder.svg?height=192&width=384",
          technologies: ["React", "OpenWeather API", "Chart.js"],
          description:
            "Interactive weather dashboard with forecasts and historical data visualization.",
          link: "#",
          github: "https://github.com/",
          featured: false,
        },
        {
          id: 5,
          title: "Fitness Tracker",
          category: "mobile",
          image: "/placeholder.svg?height=192&width=384",
          technologies: ["Flutter", "Firebase", "Google Fit API"],
          description:
            "Mobile app for tracking workouts, nutrition, and fitness goals with progress analytics.",
          link: "#",
          github: "https://github.com/",
          featured: false,
        },
        {
          id: 6,
          title: "UI Component Library",
          category: "ui",
          image: "/placeholder.svg?height=192&width=384",
          technologies: ["React", "Storybook", "Styled Components"],
          description:
            "Reusable UI component library with comprehensive documentation and examples.",
          link: "#",
          github: "https://github.com/",
          featured: false,
        },
      ];

      setProjects(fallbackProjects);
    } catch (error) {
      console.error("Error loading projects data:", error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load projects data
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter projects based on selected category - memoizado para evitar recálculos
  const filteredProjects = useCallback(() => {
    return filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);
  }, [filter, projects]);

  // Category buttons for filtering
  const categories = [
    { key: "all", label: "All Projects" },
    { key: "web", label: "Web Development" },
    { key: "mobile", label: "Mobile Apps" },
    { key: "ui", label: "UI/UX Design" },
  ];

  return (
    <section
      id="projects"
      className="py-20 px-4 md:px-8 lg:px-16"
      aria-labelledby="projects-heading">
      <div className="container mx-auto">
        <h2
          id="projects-heading"
          className="text-3xl md:text-4xl font-bold mb-2 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            My Projects
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-10"></div>

        {/* Filter Buttons */}
        <div
          className="flex flex-wrap justify-center mb-10 gap-3"
          role="tablist"
          aria-label="Project categories">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setFilter(category.key)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                filter === category.key
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              role="tab"
              aria-selected={filter === category.key}
              aria-controls={`${category.key}-projects`}
              id={`${category.key}-tab`}>
              {category.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Projects Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="tabpanel"
          id={`${filter}-projects`}
          aria-labelledby={`${filter}-tab`}>
          {!isLoading &&
            filteredProjects().map((project) => (
              <article
                key={project.id}
                className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group hover:-translate-y-2 h-full flex flex-col">
                {/* Project Image */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10"></div>
                  <Image
                    src={project.image || "/placeholder.svg?height=192&width=384"}
                    alt={`Screenshot of ${project.title}`}
                    width={384}
                    height={192}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy" // Lazy loading para imagens abaixo da dobra
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Featured Badge */}
                  {project.featured && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
                      Featured
                    </span>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {project.title}
                  </h3>

                  {/* Technologies Used */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-700 text-blue-300 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-300 mb-6 line-clamp-3 flex-grow">
                    {project.description}
                  </p>

                  {/* Project Links */}
                  <div className="flex justify-between items-center mt-auto">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded hover:opacity-90 transition-opacity text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      aria-label={`View ${project.title} project`}>
                      View Project
                    </Link>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-full p-1"
                      aria-label={`View ${project.title} source code on GitHub`}>
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
        </div>

        {/* Empty State */}
        {!isLoading && filteredProjects().length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        )}

        {/* Show more projects button */}
        {!isLoading && filteredProjects().length > 0 && (
          <div className="text-center mt-12">
            <button
              className="px-8 py-3 border border-purple-500 rounded-md hover:bg-purple-500/10 transition-all text-white font-medium focus:ring-2 focus:ring-purple-400 focus:outline-none"
              aria-label="See more projects">
              See More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
