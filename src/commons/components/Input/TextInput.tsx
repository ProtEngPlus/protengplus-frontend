import React from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { InputProps } from "./InputPropsType";

const TextInput: React.FC<InputProps> = ({
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

  return (
    <div>
      <input
        id={id}
        placeholder={placeholder}
        className={clsx(
          "h-[50px] w-full p-3 bg-white border font-light placeholder:text-placeholder rounded-md focus:border-selected focus:outline-none disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:border-[#F3F4F6] disabled:text-label",
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
      {errors[id]?.message && (
        <span className="font-light text-error text-xs">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
};

export default TextInput;
