import React from "react";
import AppRouter from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <AppRouter />
    </>
  );
};

export default App;
