import React from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { InputProps } from "./InputPropsType";
import { useState } from "react";

const PasswordInput: React.FC<InputProps> = ({
  id,
  placeholder,
  className,
  additionalValidation,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          placeholder={placeholder}
          type={isPasswordVisible ? "text" : "password"}
          className={clsx(
            "h-[50px] w-full p-3 bg-white border font-light placeholder:text-placeholder rounded-md focus:border-selected focus:outline-none",
            {
              "border-error": !!errors[id], // Apply red border if there's an error
              "border-[#DFE4EA]": !errors[id], // Default border color
            },
            className
          )}
          required
          {...register(id, { ...additionalValidation })}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md"
        >
          {isPasswordVisible ? (
            <svg
              className="shrink-0 size-7"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          ) : (
            <svg
              className="shrink-0 size-7"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
              <line x1="2" x2="22" y1="2" y2="22"></line>
            </svg>
          )}
        </button>
      </div>
      {errors[id]?.message && (
        <span className="font-light text-error text-xs">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
