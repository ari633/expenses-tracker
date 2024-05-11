"use client";
import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "danger";
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  let buttonStyle = "";
  switch (variant) {
    case "primary":
      buttonStyle = "bg-blue-500 text-white";
      break;
    case "secondary":
      buttonStyle = "bg-gray-300 text-black";
      break;
    case "danger":
      buttonStyle = "bg-orange-200 text-red-500	";
      break;
    default:
      buttonStyle = "bg-gray-500 text-white";
  }

  return (
    <button className={`px-4 py-2 rounded ${buttonStyle}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
