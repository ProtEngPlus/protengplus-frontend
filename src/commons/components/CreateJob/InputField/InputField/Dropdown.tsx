import { ValidationProps } from "../../../Input/InputPropsType";
import SelectInput, { Option } from "../../../Input/SelectInput";

export type DropdownProps = {
  id: string;
  label: string;
  defaultValue?: string;
  options: string[];
  disabled?: boolean;
  additionalValidation?: Record<string, ValidationProps>;
  onEdit?: boolean;
};

export default function DropdownInput({
  id,
  label,
  defaultValue,
  options,
  disabled,
  additionalValidation,
  onEdit = true,
}: DropdownProps) {
  const optionsValue: Option[] = options.map((option) => ({
    label: option,
    value: option,
  }));

  return (
    <div className="w-[40%]">
      <div className="min-w-fit justify-between items-center space-x-3 grid grid-cols-[1fr,4fr] max-w-[1000px]">
        <label className="font-light w-[40%]">{label}:</label>

        <SelectInput
          id={id}
          defaultValue={defaultValue}
          options={optionsValue}
          className="!w-[336px]"
          disabled={disabled}
          additionalValidation={additionalValidation}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
}
