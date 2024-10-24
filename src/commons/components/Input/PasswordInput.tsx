import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { InputProps } from "./InputPropsType";
import { Icon } from "@iconify/react/dist/iconify.js";

const PasswordInput: React.FC<InputProps> = ({
  id,
  placeholder,
  className,
  disabled,
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
            "h-[50px] w-full pl-3 pr-[60px] bg-white border font-light placeholder:text-placeholder rounded-md focus:border-selected focus:outline-none disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:border-[#F3F4F6] disabled:text-label",
            {
              "border-error": !!errors[id], // Apply red border if there's an error
              "border-[#DFE4EA]": !errors[id], // Default border color
            },
            className
          )}
          disabled={disabled}
          {...register(id, { ...additionalValidation })}
          autoComplete="off"
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-3 flex items-center z-20 cursor-pointer text-gray-400"
        >
          {isPasswordVisible ? (
            <Icon icon="carbon:view" className="size-6" />
          ) : (
            <Icon icon="carbon:view-off" className="size-6" />
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
