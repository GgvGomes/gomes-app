"use client"

const About = () => {
  // Skills array
  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "HTML/CSS", level: 90 },
    { name: "TypeScript", level: 75 },
    { name: "MongoDB", level: 70 },
    { name: "SQL", level: 65 },
    { name: "Next.js", level: 75 },
  ]

  // Experience items
  const experiences = [
    {
      role: "Senior Frontend Developer",
      company: "Tech Company Inc.",
      period: "2021 - Present",
      description:
        "Led frontend development for multiple client projects, implementing responsive designs and optimizing performance.",
    },
    {
      role: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2018 - 2021",
      description:
        "Developed full-stack applications using React, Node.js, and MongoDB, with a focus on scalable architecture.",
    },
    {
      role: "Junior Web Developer",
      company: "Web Innovations",
      period: "2016 - 2018",
      description: "Created responsive websites and collaborated with design team to implement UI/UX improvements.",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">About Me</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-10"></div>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Personal Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Hi! I'm a passionate Full Stack Developer with expertise in creating modern web applications. With over 5
              years of experience in web development, I specialize in building responsive, user-friendly applications
              with clean and maintainable code.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              My journey in technology started with a fascination for creating things that live on the internet.
              Fast-forward to today, I've had the privilege of working in diverse environments, from startups to large
              corporations, which has shaped my approach to problem-solving and collaboration.
            </p>

            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="mb-2">
                  <span className="font-semibold text-purple-400">Name:</span>
                  <span className="text-gray-300 ml-2">Your Name</span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-purple-400">Email:</span>
                  <span className="text-gray-300 ml-2">your.email@example.com</span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-purple-400">Location:</span>
                  <span className="text-gray-300 ml-2">City, Country</span>
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-semibold text-purple-400">Age:</span>
                  <span className="text-gray-300 ml-2">30</span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-purple-400">Education:</span>
                  <span className="text-gray-300 ml-2">BSc in Computer Science</span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-purple-400">Freelance:</span>
                  <span className="text-gray-300 ml-2">Available</span>
                </p>
              </div>
            </div>

            <button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              onClick={() => window.open("/path-to-your-resume.pdf", "_blank")}
            >
              Download Resume
            </button>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-6">My Skills</h3>
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-200">{skill.name}</span>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Work Experience</h3>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-purple-500 pl-5 pb-5 relative">
                {/* Timeline dot */}
                <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-0"></div>

                {/* Content */}
                <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                  <h4 className="text-xl font-semibold text-white">{exp.role}</h4>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-blue-400">{exp.company}</p>
                    <p className="text-sm text-gray-400">{exp.period}</p>
                  </div>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
