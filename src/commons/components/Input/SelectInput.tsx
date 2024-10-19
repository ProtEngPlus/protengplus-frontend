import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { InputProps } from "./InputPropsType";

const options = [
  { label: "Engineering", value: "Engineering" },
  { label: "Art", value: "Art" },
  { label: "Science", value: "Science" },
];

const SelectInput: React.FC<InputProps> = ({
  id,
  placeholder,
  className,
  additionalValidation,
}) => {
  const {
    register,
    setValue,
    getValues,
    clearErrors, // Add clearErrors to clear errors on change
    formState: { errors },
  } = useFormContext();

  const [isOpen, setIsOpen] = useState(false);
  const currentValue = getValues(id); // Get current value from the form

  const handleOptionClick = (optionValue: string) => {
    setValue(id, optionValue); // Update the form value
    clearErrors(id); // Clear the error when the user selects an option
    setIsOpen(false); // Close the dropdown
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".custom-select")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full custom-select">
      <div
        className={clsx(
          "flex flex-row bg-white border font-light rounded-md py-3 px-4 cursor-pointer gap-1 ",
          {
            "border-error": !!errors[id], // Apply red border if there's an error
            "border-[#DFE4EA]": !errors[id], // Default border color
            "border-selected": isOpen,
          },
          className
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`grow ${
            options.find((option) => option.value === currentValue)
              ? "text-black"
              : "text-placeholder"
          }`}
        >
          {options.find((option) => option.value === currentValue)?.label ||
            placeholder}
        </div>
        <Icon
          icon="quill:chevron-down"
          className="text-[#637381] size-4 my-auto"
        />
      </div>

      {isOpen && (
        <ul className="mt-2 absolute w-full bg-white rounded-md shadow-dropShadow z-10 py-2">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-5 py-2 font-light text-label hover:text-selected hover:bg-blue-50 focus:bg-blue-100 cursor-pointer"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      <input
        type="hidden"
        {...register(id, { ...additionalValidation })}
        value={currentValue || ""}
      />

      {typeof errors[id]?.message === "string" && (
        <p className="text-red-500 text-sm">{errors[id]?.message}</p>
      )}
    </div>
  );
};

export default SelectInput;
