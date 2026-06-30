export const corsOptions = {
  origin:
    process.env.NODE_ENV ===
    "production"[
      ("https://client-authentiction-system-sigma.vercel.app/",
      "https://admin-authentiction-system-blue.vercel.app/admin")
    ],

  credentials: true, // Allow cookies
  optionsSuccessStatus: 200,
};
