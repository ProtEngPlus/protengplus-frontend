import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { ValidationProps } from "./InputPropsType";

export type TextProps = {
  id: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  additionalValidation?: Record<string, ValidationProps>;
  onEdit?: boolean;
};

export default function TextInput({
  id,
  placeholder,
  className,
  disabled,
  additionalValidation,
  onEdit = true,
}: TextProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const currentValue = watch(id);

  return (
    <div>
      {!onEdit ? (
        <div>{currentValue}</div>
      ) : (
        <div>
          <input
            id={id}
            placeholder={placeholder}
            className={clsx(
              "h-[50px] w-full p-3 bg-white border font-light placeholder:text-placeholder rounded-md focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-100 disabled:text-label",
              {
                "border-error": !!errors[id],
                "border-gray-border": !errors[id],
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
      )}
    </div>
  );
}
