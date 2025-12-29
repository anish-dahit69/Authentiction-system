import React, { useState } from "react";
import { Lock, Shield, Zap, Database, Code, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginBtn = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">SecureAuth</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-300 hover:text-purple-400 transition"
              >
                Features
              </a>
              <a
                href="#tech"
                className="text-gray-300 hover:text-purple-400 transition"
              >
                Technology
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-purple-400 transition"
              >
                About
              </a>
              <button
                onClick={handleLoginBtn}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition transform hover:scale-105"
              >
                Login
              </button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-purple-500/20">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block text-gray-300 hover:text-purple-400"
              >
                Features
              </a>
              <a
                href="#tech"
                className="block text-gray-300 hover:text-purple-400"
              >
                Technology
              </a>
              <a
                href="#about"
                className="block text-gray-300 hover:text-purple-400"
              >
                About
              </a>
              <button
                onClick={handleLoginBtn}
                className="w-full px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
            <span className="text-purple-300 text-sm font-semibold">
              🔒 Secure Authentication System
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Modern Authentication
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Made Simple
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            A full-stack authentication system built with Express, MongoDB, and
            React. Secure, scalable, and ready for production use.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold text-lg transition transform hover:scale-105 shadow-lg shadow-purple-500/50">
              Get Started
            </button>
            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-lg transition border border-purple-500/30">
              View Documentation
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Everything you need for secure authentication
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Secure Authentication
              </h3>
              <p className="text-gray-400">
                JWT-based authentication with bcrypt password hashing for
                maximum security.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                User Management
              </h3>
              <p className="text-gray-400">
                Complete user registration, login, and profile management
                system.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fast & Efficient
              </h3>
              <p className="text-gray-400">
                Optimized performance with MongoDB indexing and efficient
                queries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div
        id="tech"
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Tech Stack
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Built with modern, reliable technologies
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-purple-500/20 text-center">
              <Code className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Express.js</h3>
              <p className="text-gray-400 text-sm">
                Fast, minimalist backend framework
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-purple-500/20 text-center">
              <Database className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">MongoDB</h3>
              <p className="text-gray-400 text-sm">Flexible NoSQL database</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-purple-500/20 text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="#61DAFB"
                  className="w-12 h-12"
                >
                  <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">React</h3>
              <p className="text-gray-400 text-sm">Dynamic user interface</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-purple-500/20 text-center">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">
                JWT & Bcrypt
              </h3>
              <p className="text-gray-400 text-sm">Secure token-based auth</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            About This Project
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            SecureAuth is a comprehensive authentication system designed to
            provide developers with a solid foundation for building secure web
            applications. This project demonstrates best practices in user
            authentication, data security, and modern web development.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Built with the MERN stack (MongoDB, Express, React, Node.js), it
            includes features like password hashing, JWT token management,
            protected routes, and user session handling. Whether you're learning
            authentication or need a starting point for your next project, this
            system has you covered.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-purple-500/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>
            &copy; 2024 SecureAuth. Built with ❤️ using Express, MongoDB &
            React.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
