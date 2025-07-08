import React from 'react';
import { Github, Linkedin, Mail, MapPin, GraduationCap, Code2, ExternalLink } from 'lucide-react';

function App() {
  const teamMembers = [
    {
      name: "Rohan Domakonda",
      role: "Full Stack Developer",
      image: " ",
      description: "Passionate software engineer with expertise in React, Spring boot. Specialized in building scalable web applications and microservices architecture. Always eager to learn new technologies and contribute to open-source projects.",
      github: "https://github.com/rohan-domakonda",
      linkedin: "https://linkedin.com/in/rohan-domakonda",
      email: "dr23csb0f10@student.nitw.ac.in",
      skills: ["React", "Spring boot", "Java", "TailwindCSS","C++", "SQL"]
    },
    {
      name: "Dustakar Abhiraj",
      role: "Full Stack Developer",
      image: "",
      description: "Enthusiastic software developer with a strong foundation in full-stack development. Proficient in building scalable web applications using React and Spring boot Microservices. Passionate about open-source contributions and continuous learning.",
      github: "https://github.com/DAbhiraj",
      linkedin: "https://linkedin.com/in/Dabhiraj",
      email: "da23csb0a32@student.nitw.ac.in",
      skills: ["React", "Springboot", "Java", "Docker", "C++", "PostgreSQL"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <GraduationCap className="w-12 h-12 text-blue-400 mr-3" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                About Us
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Computer Science Engineering students from the prestigious National Institute of Technology, Warangal,
              passionate about building innovative solutions and contributing to the tech community.
            </p>
          </div>
        </div>
      </div>

      {/* University Info Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <div className="flex items-center mb-6">
            <MapPin className="w-8 h-8 text-blue-400 mr-3" />
            <h2 className="text-3xl font-bold text-white">National Institute of Technology, Warangal</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Computer Science & Engineering</h3>
              <p className="text-gray-300 leading-relaxed">
                One of India's premier technical institutes, NIT Warangal has been at the forefront of technological 
                education and research since 1959. Our Computer Science & Engineering department is renowned for 
                producing skilled professionals who contribute significantly to the global tech industry.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                We are committed to leveraging our technical education to create meaningful solutions, contribute to 
                open-source projects, and build applications that make a positive impact on society. Our goal is to 
                bridge the gap between academic knowledge and real-world applications.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Code2 className="w-8 h-8 text-purple-400 mr-3" />
            <h2 className="text-4xl font-bold text-white">Meet Our Team</h2>
          </div>
          <p className="text-gray-400 text-lg">
            Dedicated developers building the future, one line of code at a time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-300"></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-semibold mb-4">{member.role}</p>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {member.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4">
                    <a 
                      href={member.github}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 hover:text-white transition-all duration-200 group/link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5" />
                      <span className="text-sm font-medium">GitHub</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                    
                    <a 
                      href={member.linkedin}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 hover:text-blue-300 transition-all duration-200 group/link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm font-medium">LinkedIn</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                    
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 hover:text-purple-300 transition-all duration-200 group/link"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-sm font-medium">Email</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-700/50">
        <div className="text-center">
          <p className="text-gray-400">
            © 2024 NIT Warangal CSE Students. Built with passion and dedication.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Continuously learning, building, and contributing to the tech community.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;