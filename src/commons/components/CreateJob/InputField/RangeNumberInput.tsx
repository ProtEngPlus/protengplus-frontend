import { ValidationProps } from "../../Input/InputPropsType";
import { useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react";
import clsx from "clsx";

export type RangeNumberInputProps = {
  id: string;
  label: string;
  defaultMin?: number;
  defaultMax?: number;
  className?: string;
  disabled?: boolean;
  additionalValidation?: Record<string, ValidationProps>;
};

export default function RangeNumberInput({
  id,
  label,
  defaultMin,
  defaultMax,
  className,
  disabled,
  additionalValidation,
}: RangeNumberInputProps) {
  const {
    register,
    watch,
    formState: { errors },
    setValue: setFormValue,
    getValues,
  } = useFormContext();

  const handleIncrease = (field: string) => {
    const currentValue = parseFloat(getValues(field)) || 0;
    setFormValue(field, currentValue + 1);
  };

  const handleDecrease = (field: string) => {
    const currentValue = parseFloat(getValues(field)) || 0;
    setFormValue(field, Math.max(0, currentValue - 1));
  };

  const handleBlur = (field: string, defaultValue: number | undefined) => {
    const currentValue = parseFloat(getValues(field));
    if (isNaN(currentValue)) {
      setFormValue(field, defaultValue);
    }
  };

  return (
    <div className="space-y-2 w-fit">
      <label className="font-light leading-loose">{label}</label>
      <div className="flex gap-3 items-center">
        {/* Min Input */}
        <div className="relative w-fit min-w-fit">
          <input
            id={`${id}-min`}
            type="text"
            defaultValue={defaultMin || ""}
            {...register(`${id}-min`, {
              ...(additionalValidation || {}),
              onBlur: () => handleBlur(`${id}-min`, defaultMin),
            })}
            className={clsx(
              "h-[46px] w-[80px] p-2 bg-white border text-sm border-pep-gray-border font-light placeholder:text-placeholder rounded-md focus:ring-0 focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-100 disabled:text-label",
              {
                "border-error": !!errors[`${id}-min`],
                "border-gray-border": !errors[`${id}-min`],
              },
              className
            )}
            disabled={disabled}
            autoComplete="off"
            aria-label={`Minimum value for ${id}`}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
            <Icon
              icon="mingcute:up-line"
              className="text-pep-dark-gray size-[15px] hover:text-pep-gray cursor-pointer"
              onClick={() => handleIncrease(`${id}-min`)}
            />
            <Icon
              icon="mingcute:down-line"
              className="text-pep-dark-gray size-[15px] hover:text-pep-gray cursor-pointer"
              onClick={() => handleDecrease(`${id}-min`)}
            />
          </div>
        </div>

        <div className="text-pep-gray font-light text-sm">to</div>

        {/* Max Input */}
        <div className="relative w-fit min-w-fit">
          <input
            id={`${id}-max`}
            type="text"
            defaultValue={defaultMax || ""}
            {...register(`${id}-max`, {
              ...(additionalValidation || {}),
              validate: (value: string) => {
                const min = parseFloat(watch(`${id}-min`)) || 0;
                const max = parseFloat(value) || 0;
                if (min > max) {
                  return "Max value should be greater than min value.";
                }
                return true;
              },
              onBlur: () => handleBlur(`${id}-max`, defaultMax),
            })}
            className={clsx(
              "h-[46px] w-[80px] p-2 bg-white border text-sm border-pep-gray-border font-light placeholder:text-placeholder rounded-md focus:ring-0 focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-100 disabled:text-label",
              {
                "border-error": !!errors[`${id}-max`],
                "border-gray-border": !errors[`${id}-max`],
              },
              className
            )}
            disabled={disabled}
            autoComplete="off"
            aria-label={`Maximum value for ${id}`}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
            <Icon
              icon="mingcute:up-line"
              className="text-pep-dark-gray size-[15px] hover:text-pep-gray cursor-pointer"
              onClick={() => handleIncrease(`${id}-max`)}
            />
            <Icon
              icon="mingcute:down-line"
              className="text-pep-dark-gray size-[15px] hover:text-pep-gray cursor-pointer"
              onClick={() => handleDecrease(`${id}-max`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
