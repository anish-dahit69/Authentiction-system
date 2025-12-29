import React from "react";
import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/MainRoutes";

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
