"use client"

import { useState, useEffect } from "react"

interface Project {
  id: number
  title: string
  category: string
  image: string
  technologies: string[]
  description: string
  link: string
  github: string
  featured?: boolean
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState("all")

  // Load projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Tente carregar os dados do arquivo JSON
        const response = await fetch("/data/projects.json")
        const data = await response.json()
        setProjects(data.projects || [])
      } catch (error) {
        console.error("Error loading projects data:", error)
        // Fallback projects if JSON loading fails
        const fallbackProjects = [
          {
            id: 1,
            title: "E-Commerce Website",
            category: "web",
            image: "/assets/images/project-placeholder.jpg",
            technologies: ["React", "Node.js", "MongoDB"],
            description: "Full-featured e-commerce platform with product catalog, cart, and payment integration.",
            link: "#",
            github: "https://github.com/",
            featured: true,
          },
          {
            id: 2,
            title: "Task Management App",
            category: "mobile",
            image: "/assets/images/project-placeholder.jpg",
            technologies: ["React Native", "Firebase"],
            description: "A mobile app for task organization with real-time updates and notifications.",
            link: "#",
            github: "https://github.com/",
            featured: true,
          },
          {
            id: 3,
            title: "Portfolio Website",
            category: "web",
            image: "/assets/images/project-placeholder.jpg",
            technologies: ["HTML", "CSS", "JavaScript"],
            description: "A responsive portfolio website showcasing projects and skills.",
            link: "#",
            github: "https://github.com/",
            featured: false,
          },
        ]
        setProjects(fallbackProjects)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects based on selected category
  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  // Category buttons for filtering
  const categories = [
    { key: "all", label: "All Projects" },
    { key: "web", label: "Web Development" },
    { key: "mobile", label: "Mobile Apps" },
    { key: "ui", label: "UI/UX Design" },
  ]

  return (
    <section id="projects" className="py-20 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            My Projects
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-10"></div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center mb-10 gap-3">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setFilter(category.key)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                filter === category.key
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10"></div>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Featured Badge */}
                {project.featured && (
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
                    Featured
                  </span>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>

                {/* Technologies Used */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="text-xs bg-gray-700 text-blue-300 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 mb-6 line-clamp-3">{project.description}</p>

                {/* Project Links */}
                <div className="flex justify-between items-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded hover:opacity-90 transition-opacity text-sm"
                  >
                    View Project
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more projects button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-purple-500 rounded-md hover:bg-purple-500/10 transition-all text-white font-medium">
            See More Projects
          </button>
        </div>
      </div>
    </section>
  )
}

export default Projects
