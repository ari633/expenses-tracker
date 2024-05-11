"use client";
import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "danger";
  isLoading?: boolean,
  onClick: (e: React.FormEvent<Element>) => void;
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children, isLoading }) => {

  const handleOnClick = (event: React.FormEvent<Element>) => {
    onClick(event);
  };

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
    <button disabled={isLoading} className={`px-4 py-2 rounded ${buttonStyle} ${isLoading ? 'bg-gray-300' : ''}`} onClick={handleOnClick}>
      {children}
    </button>
  );
};

export default Button;
