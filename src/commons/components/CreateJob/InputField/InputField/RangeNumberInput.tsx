import { ValidationProps } from "../../../Input/InputPropsType";
import { useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react";
import clsx from "clsx";

export type RangeNumberInputProps = {
  id: string;
  label: string;
  defaultLow?: number;
  defaultHigh?: number;
  className?: string;
  disabled?: boolean;
  additionalValidation?: Record<string, ValidationProps>;
  onEdit?: boolean;
};

export default function RangeNumberInput({
  id,
  label,
  defaultLow,
  defaultHigh,
  className,
  disabled,
  additionalValidation,
  onEdit = true,
}: RangeNumberInputProps) {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();
  const currentValueMin = watch(`${id}_min`) ?? defaultLow;
  const currentValueMax = watch(`${id}_max`) ?? defaultHigh;

  const handleIncrease = (field: string) => {
    const currentValue = parseFloat(getValues(field)) || 0;
    setValue(field, Number(currentValue + 1));
  };

  const handleDecrease = (field: string) => {
    const currentValue = parseFloat(getValues(field)) || 0;
    setValue(field, Math.max(0, currentValue - 1));
  };

  const handleBlur = (field: string, defaultValue: number | undefined) => {
    const currentValue = parseFloat(getValues(field));
    if (isNaN(currentValue)) {
      setValue(field, Number(defaultValue));
    }
  };

  return (
    <div className="w-full flex flex-nowrap text-nowrap">
      {!onEdit ? (
        <div className="w-full min-w-fit flex flex-row justify-between space-x-3 items-center">
          <label>{label}:</label>
          <div className="w-24 min-w-fit text-start">
            {currentValueMin} - {currentValueMax}
          </div>
        </div>
      ) : (
        <div className="space-y-2 w-fit">
          <label className="font-light leading-loose">{label}</label>
          <div className="flex gap-3 items-center">
            {/*----------------------------------- Min Input ------------------------------------------*/}
            <div className="relative w-fit min-w-fit">
              <input
                id={`${id}_min`}
                type="text"
                defaultValue={defaultLow}
                {...register(`${id}_min`, {
                  ...(additionalValidation || {}),
                  onBlur: () => handleBlur(`${id}_min`, defaultLow),
                })}
                className={clsx(
                  "h-[46px] w-[80px] p-2 bg-white border text-sm border-pep-gray-border font-light placeholder:text-placeholder rounded-md focus:ring-0 focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled disabled:text-label",
                  {
                    "border-error": !!errors[`${id}_min`],
                    "border-gray-border": !errors[`${id}_min`],
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
                  onClick={() => handleIncrease(`${id}_min`)}
                />
                <Icon
                  icon="mingcute:down-line"
                  className="text-pep-dark-gray size-[15px] hover:text-pep-gray cursor-pointer"
                  onClick={() => handleDecrease(`${id}_min`)}
                />
              </div>
            </div>

            <div className="text-pep-gray font-light text-sm">to</div>

            {/*----------------------------------- Max Input ------------------------------------------*/}
            <div className="relative w-fit min-w-fit">
              <input
                id={`${id}_max`}
                type="text"
                defaultValue={defaultHigh}
                {...register(`${id}_max`, {
                  ...(additionalValidation || {}),
                  validate: (value: string) => {
                    const min = parseFloat(watch(`${id}_min`)) || 0;
                    const max = parseFloat(value) || 0;
                    if (min > max) {
                      return "Max value should be greater than min value.";
                    }
                    return true;
                  },
                  onBlur: () => handleBlur(`${id}_max`, defaultHigh),
                })}
                className={clsx(
                  "h-[46px] w-[80px] p-2 bg-white border text-sm border-pep-gray-border font-light placeholder:text-placeholder rounded-md focus:ring-0 focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-100 disabled:text-label",
                  {
                    "border-error": !!errors[`${id}_max`],
                    "border-gray-border": !errors[`${id}_max`],
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
                  onClick={() => handleIncrease(`${id}_max`)}
                />
                <Icon
                  icon="mingcute:down-line"
                  className="text-pep-dark-gray size-[15px] hover:text-pep-gray cursor-pointer"
                  onClick={() => handleDecrease(`${id}_max`)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
