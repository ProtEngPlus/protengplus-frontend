import React from "react";
import clsx from "clsx";

interface ButtonProps {
  buttonType: "submit" | "cancel" | "delete";
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
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseStyles = "w-48 h-[3.125rem] rounded-md px-7 py-3";
  const typeStyles = {
    submit: "font-medium bg-[#2578D3] hover:bg-[#1B44C8] text-white",
    cancel:
      "font-light bg-white hover:bg-blue-50 text-black hover:text-[#2578D3] border border-[#DFE4EA]",
    delete: "font-medium bg-red-500 hover:bg-red-700 text-white",
  };

  return (
    <button
      id={id}
      className={clsx(baseStyles, typeStyles[buttonType], className)}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
}
