import { useContext } from "react";
import { AuthContext } from "../context/AdminSession";

export const useSession = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used inside AuthProvider");
  }
  return context;
};
