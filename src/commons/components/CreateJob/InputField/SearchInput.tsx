import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { ValidationProps } from "../../Input/InputPropsType";
import searchIcon from "../../../../assets/images/CreateJob/searchIcon.svg";

export type SearchProps = {
  id: string;
  placeholder: string;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  additionalValidation?: Record<string, ValidationProps>;
};

export default function SearchInput({
  id,
  placeholder,
  defaultValue,
  className,
  disabled,
  additionalValidation,
}: SearchProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative items-center">
      <input
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={clsx(
          "h-[50px] min-w-[500px] w-full pl-3 pr-10 bg-white border font-light placeholder:text-placeholder rounded-md focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled disabled:text-label",
          {
            "border-error": !!errors[id],
            "border-gray-border": !errors[id],
          },
          className
        )}
        disabled={disabled}
        {...register(id, { ...additionalValidation })}
        autoComplete="off"
      ></input>
      <img
        src={searchIcon}
        alt="search"
        className="absolute top-1/2 right-3 transform -translate-y-1/2"
      />
    </div>
  );
}
