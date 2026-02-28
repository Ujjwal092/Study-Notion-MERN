import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] px-6 py-3 rounded-md font-semibold
        transition-all duration-300 transform
        ${
          active
            ? "bg-yellow-50 text-black shadow-lg shadow-yellow-50/40 hover:shadow-yellow-50/60"
            : "bg-richblack-800 text-white shadow-md hover:shadow-xl"
        }
        hover:-translate-y-1
        `}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
