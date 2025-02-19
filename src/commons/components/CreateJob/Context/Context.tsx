import { useState } from "react";
import editIcon from "../../../../assets/images/CreateJob/editIcon.svg";
import onEditIcon from "../../../../assets/images/CreateJob/onEditIcon.svg";

export default function Context({
  title,
  children,
  isConclusion = false,
  onEdit = true,
  onEditChange,
}: {
  title: string;
  children?: React.ReactNode;
  isConclusion?: boolean; // for conclusion
  onEdit?: boolean; // for conclusion
  onEditChange?: (isEdit: boolean) => void; // for conclusion
}) {
  const [isEdit, setEdit] = useState(onEdit);

  const handleEditToggle = () => {
    setEdit(!isEdit);
    if (onEditChange) onEditChange(!isEdit);
  };

  return (
    <div className="space-y-6 font-light">
      <div className="w-[353px] min-w-fit flex justify-between border-l-4 border-pep-orange px-6 font-light text-xl gap-x-5">
        {title}

        {isConclusion && (
          <img
            src={isEdit ? onEditIcon : editIcon}
            alt="edit"
            className="size-8 cursor-pointer"
            onClick={handleEditToggle}
          />
        )}
      </div>
      <hr />
      <div
        className={`rounded-lg  p-5 space-y-4 ${
          isEdit ? "bg-pep-blue-light" : "bg-white border border-pep-gray"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
