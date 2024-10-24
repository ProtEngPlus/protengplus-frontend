import React from "react";
import PasswordInput from "../../../commons/components/Input/PasswordInput";
import { InputProps } from "../../../commons/components/Input/InputPropsType";

interface PasswordFieldProps extends InputProps {
  label: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  placeholder,
  additionalValidation,
  className,
}) => {
  return (
    <div className="grid grid-cols-[200px_400px] gap-5 items-center">
      <label className="font-light" htmlFor={id}>
        {label}
      </label>
      <PasswordInput
        id={id}
        placeholder={placeholder}
        additionalValidation={additionalValidation}
        className={className}
      />
    </div>
  );
};

export default PasswordField;
