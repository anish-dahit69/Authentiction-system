import React from "react";

const Footer = () => {
  return (
    <div className=" w-full py-16 text-sm bg-slate-50 text-gray-800/70">
      <footer className="container flex flex-col items-center justify-around">
        <p className="mt-4 text-center">
          Copyright © 2025 Auth. All rights reservered.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <a
            href="#"
            className="font-medium text-gray-800 hover:text-black transition-all"
          >
            Brand Guidelines
          </a>
          <div className="h-4 w-px bg-black/20"></div>
          <a
            href="#"
            className="font-medium text-gray-800 hover:text-black transition-all"
          >
            Trademark Policy
          </a>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
