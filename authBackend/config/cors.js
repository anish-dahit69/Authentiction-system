export const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://yourdomain.com" // Production URL
      : ["http://localhost:5173", "http://localhost:5174"], // Development (Vite)
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200,
};
