import { Icon } from "@iconify/react";
import { useState } from "react";
import editIcon from "../../../../assets/images/CreateJob/editIcon.svg";
import onEditIcon from "../../../../assets/images/CreateJob/onEditIcon.svg";

export default function ContextWithHelperText({
  title,
  children,
  helperText,
  isConclusion = false,
  onEdit = true,
  onEditChange,
  disabled = false,
}: {
  title: string;
  children?: React.ReactNode;
  helperText: React.ReactNode;
  isConclusion?: boolean; // for conclusion step
  onEdit?: boolean; // for conclusion step
  onEditChange?: () => void; // for conclusion step
  disabled?: boolean;
}) {
  const [isRead, setRead] = useState(false);

  return (
    <div className="space-y-6 font-light">
      <div className="w-[353px] min-w-fit flex justify-between border-l-4 border-pep-orange px-6 font-light text-xl gap-x-5">
        {title}
        <Icon
          icon="material-symbols:info-outline"
          className={`size-8 cursor-pointer ${
            isRead ? "text-pep-blue" : "text-pep-gray"
          } `}
          onClick={() => setRead(!isRead)}
        />
        {isConclusion && (
          <img
            src={disabled ? onEditIcon : onEdit ? onEditIcon : editIcon}
            alt="edit"
            className={`size-8  ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => {
              if (!disabled && onEditChange) {
                onEditChange();
              }
            }}
          />
        )}
      </div>
      <hr />
      <div className="relative">
        {/* children */}
        <div
          className={`rounded-lg  p-5 space-y-4 ${
            onEdit ? "bg-pep-blue-light" : "bg-white border border-pep-gray"
          }`}
        >
          <div className="flex space-x-3">
            <Icon icon="ep:setting" className="text-pep-gray size-6" />
            <label>Parameter Setup</label>
          </div>
          {children}
        </div>

        {/* Helper Text */}
        {isRead && (
          <div className="absolute inset-0 rounded-lg p-5 z-10 bg-pep-blue-light min-h-fit">
            <div className="flex space-x-3">
              <Icon icon="ep:setting" className="text-pep-gray size-6" />
              <label>Parameter Setup</label>
            </div>
            {helperText}
          </div>
        )}
      </div>
    </div>
  );
}
