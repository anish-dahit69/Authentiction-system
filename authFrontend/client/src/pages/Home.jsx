import React from "react";
import { useAuth } from "../hooks/auth";
const Home = () => {
  const { user, loading } = useAuth();
  return (
    <section className="w-full h-full flex flex-col items-center  py-28 leading-[2rem]">
      <p className="text-3xl -tracking-normal">
        Welcome to you,
        <span className="capitalize px-1 text-primary italic">
          {user?.name}
        </span>
      </p>
      <p>
        {loading ? (
          "Loading..."
        ) : user ? (
          <>
            You are logged in as :
            <span className="ml-1 font-medium text-primary italic">
              {user.email}
            </span>
          </>
        ) : (
          "You are not logged in."
        )}
      </p>

      <p>
        {user?.role === "admin"
          ? `You have admin privileges.`
          : "You are a regular user."}
      </p>
    </section>
  );
};

export default Home;
