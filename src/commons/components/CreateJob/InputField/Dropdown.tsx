import { ValidationProps } from "../../Input/InputPropsType";
import SelectInput, { Option } from "../../Input/SelectInput";

export type DropdownProps = {
  id: string;
  label: string;
  defaultValue?: string;
  options: string[];
  className?: string;
  disabled?: boolean;
  additionalValidation?: Record<string, ValidationProps>;
};

export default function DropdownInput({
  id,
  label,
  defaultValue,
  options,
  disabled,
  additionalValidation,
}: DropdownProps) {
  const optionsValue: Option[] = options.map((option) => ({
    label: option,
    value: option,
  }));

  return (
    <div className="min-w-fit w-[436px] flex flex-row justify-between items-center space-x-3">
      <label className="font-light w-[88px]">{label}:</label>
      <SelectInput
        id={id}
        defaultValue={defaultValue}
        options={optionsValue}
        className="w-full"
        disabled={disabled}
        additionalValidation={additionalValidation}
      />
    </div>
  );
}
