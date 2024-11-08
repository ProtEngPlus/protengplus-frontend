export type CheckboxProps = {
  id: string;
  label?: string;
  value: string;
  checked?: boolean;
  disable?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function Checkbox({
  id,
  label,
  value,
  checked,
  disable,
  onChange,
}: CheckboxProps) {
  return (
    <>
      <div className="flex items-center mb-4">
        <input
          id={id}
          type="checkbox"
          value={value}
          checked={checked}
          onChange={(e) => onChange && onChange(e.target.checked)}
          disabled={disable}
          className={`w-4 h-4  ${
            disable
              ? "text-gray-500 border-gray-500"
              : "text-selected border-selected"
          }  border-2 rounded focus:ring-0 dark:bg-selected dark:border-selected`}
        />
        {label ? (
          <label className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-800">
            {label}
          </label>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
