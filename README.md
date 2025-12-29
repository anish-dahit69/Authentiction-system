🔐 MERN Authentication System
A full-stack authentication system built with the MERN stack (MongoDB, Express, React, Node.js) featuring separate client and admin panels with role-based access control.

✨ Features

🔒 Secure Authentication - JWT-based authentication with HTTP-only cookies
👥 Role-Based Access Control - Separate access levels for users and admins
🛡️ Protected Routes - Client and server-side route protection
👨‍💼 Admin Panel - Complete user management dashboard
📱 Separate Interfaces - Distinct client and admin portals
🔐 Password Security - Bcrypt password hashing
✅ Input Validation - Comprehensive form validation
📱 Email verify with otp using
🚀 Modern UI - Responsive design with React and Tailwind CSS

🛠️ Tech Stack
Frontend:

React 18
React Router DOM
Tailwind CSS
Axios

Backend:

Node.js
Express.js
MongoDB with Mongoose
JSON Web Tokens (JWT)
Bcrypt

Dev Tools:

Bun (Package Manager & Runtime)
Vite (Build Tool)

📋 Prerequisites
Before you begin, ensure you have the following installed:

Bun (latest version)
MongoDB (local or Atlas account)
Git

Set up environment variables
Create a .env file in the root directory:
copy the content given in .env.example file in you .env file

Start the application
bun dev

This will start:

Backend: http://localhost:3000
Client Panel: http://localhost:5173
Admin Panel: http://localhost:5174

🎯 Usage
Creating an Admin User

Register a new user through the client interface
Update the user role in MongoDB:

🔒 Security Features

✅ Password hashing with bcrypt
✅ JWT token authentication
✅ HTTP-only cookies
✅ Protected API routes
✅ Role-based middleware
✅ Input validation and sanitization
✅ CORS configuration
✅ Rate limiting (optional)
