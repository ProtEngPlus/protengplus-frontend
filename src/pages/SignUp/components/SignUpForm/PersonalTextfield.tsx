import { Icon } from "@iconify/react";
import { useFormContext } from "react-hook-form";
import TextInput from "../../../../commons/components/Input/TextInput";
import SelectInput from "../../../../commons/components/Input/SelectInput";

interface PersonalProps {
  label: string;
  id: string;
  placeholder: string;
  type: string;
}

const PersonalField: React.FC<PersonalProps> = ({
  label,
  id,
  placeholder,
  type,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-row items-center space-x-3">
      <div className="flex flex-row gap-x-3 items-center">
        {errors[id] && <span className="text-red-500">*</span>}
        <label className="w-[5.5rem] font-light text-base">{label}:</label>
      </div>
      <div className="grow">
        {type === "text" && (
          <TextInput
            id={id}
            placeholder={placeholder}
            additionalValidation={{
              required: {
                value: true,
              },
            }}
          />
        )}
        {type === "select" && (
          <SelectInput
            id={id}
            placeholder={placeholder}
            additionalValidation={{
              required: {
                value: true,
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalField;
