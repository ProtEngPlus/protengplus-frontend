import React from "react";
import clsx from "clsx";

interface ButtonProps {
  buttonType: "submit" | "cancel" | "delete" | "next";
  id: string;
  text: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  buttonType,
  id,
  text,
  className,
  onClick,
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseStyles =
    "w-48 h-[3.125rem] rounded-md px-7 py-3 disabled:cursor-not-allowed disabled:bg-white disabled:text-label disabled:border disabled:border-pep-gray-border";
  const typeStyles = {
    submit: "font-medium bg-pep-blue hover:bg-pep-blue-hover text-white",
    cancel:
      "font-light bg-white hover:bg-blue-50 text-black hover:text-pep-blue border border-pep-gray-border",
    delete: "font-medium bg-red-500 hover:bg-red-700 text-white",
    next: "bg-pep-orange text-white",
  };

  return (
    <button
      id={id}
      className={clsx(baseStyles, typeStyles[buttonType], className)}
      onClick={onClick}
      {...props}
    >
      {children}
      {text}
    </button>
  );
}
