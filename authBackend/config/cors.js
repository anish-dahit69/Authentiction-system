export const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://yourdomain.com" // Production URL
      : [
          "https://authentiction-system-frontent-clien.vercel.app/",
          "https://authentiction-system-admin-frontend-zeta.vercel.app/",
        ], // Development (Vite)
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200,
};
