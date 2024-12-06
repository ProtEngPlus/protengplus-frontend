import { ValidationProps } from "../../Input/InputPropsType";
import { useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react";
import clsx from "clsx";

export type NumberInputProps = {
  id: string;
  label: string;
  defaultValue?: number;
  className?: string;
  disabled?: boolean;
  additionalValidation?: Record<string, ValidationProps>;
};

export default function NumberInput({
  id,
  label,
  defaultValue,
  className,
  disabled,
  additionalValidation,
}: NumberInputProps) {
  const {
    register,
    formState: { errors },
    setValue: setFormValue,
    getValues,
  } = useFormContext();

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentValue = parseFloat(getValues(id)) || 0;
    setFormValue(id, currentValue + 1);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentValue = parseFloat(getValues(id)) || 0;
    setFormValue(id, Math.max(0, currentValue - 1));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === "") {
      setFormValue(id, defaultValue || 0);
    }
  };

  return (
    <div className="w-[230px] min-w-fit flex flex-row justify-between space-x-2 items-center">
      <label className="font-light">{label}:</label>
      <div className="relative w-fit min-w-fit">
        <input
          id={id}
          type="text"
          defaultValue={defaultValue}
          {...register(id, {
            ...(additionalValidation || {}),
            onBlur: handleBlur,
          })}
          className={clsx(
            "h-[40px] w-24 p-2 bg-white border text-sm border-pep-gray-border font-light placeholder:text-placeholder rounded-md focus:ring-0 focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-100 disabled:text-label",
            {
              "border-error": !!errors[id],
              "border-gray-border": !errors[id],
            },
            className
          )}
          disabled={disabled}
          autoComplete="off"
          aria-label={`Percentage input for ${id}`}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
          {/* Increase button */}
          <Icon
            icon="mingcute:up-line"
            className="text-pep-dark-gray size-[15px] hover:text-pep-gray cursor-pointer"
            onClick={handleIncrease}
          />
          {/* Decrease button */}
          <Icon
            icon="mingcute:down-line"
            className="text-pep-dark-gray size-[15px] hover:text-pep-gray cursor-pointer"
            onClick={handleDecrease}
          />
        </div>

        {errors[id]?.message && (
          <span className="font-light text-error text-xs">
            {errors[id]?.message as string}
          </span>
        )}
      </div>
    </div>
  );
}
