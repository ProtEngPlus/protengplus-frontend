import { useState } from "react";
import onEditIcon from "../../../../assets/images/CreateJob/onEditIcon.svg";
import Button from "../../../../commons/components/Button/Button";

export type RenameMutationProps = {
  onClose: () => void;
  onConfirm: (name: string) => void;
};

export function RenameMutationOverlay({
  isVisible,
  renameMutationProps,
}: {
  isVisible: boolean;
  renameMutationProps: RenameMutationProps;
}) {
  const { onClose, onConfirm } = renameMutationProps;
  const [name, setName] = useState("");

  const [isError, setIsError] = useState(false);
  const handleConfirm = () => {
    if (name.length === 0) {
      setIsError(true);
    } else {
      onConfirm(name);
    }
  };

  return (
    isVisible && (
      <div
        id="#rename-mutation-modal"
        className="fixed top-0 right-0 left-0 z-[90] flex justify-center items-center w-full h-full bg-gray-900/50 mt-0"
      >
        <div className="space-y-5 place-items-center place-self-center w-[55%] place-content-center text-center">
          <div className="bg-pep-blue-light opacity-100 px-5 py-8 m-auto z-[100] space-y-8">
            <div className="flex space-x-3 place-self-center">
              <img
                src={onEditIcon}
                alt="edit"
                className="text-pep-gray size-8 min-w-8"
              />
              <span className="text-2xl text-pep-dark-gray">
                Rename
              </span>
            </div>

            <div className="bg-white rounded-lg p-8 gap-x-3 gap-y-4 font-light text-start">
              <div className="space-y-4">
                <div className="items-center space-x-3 grid grid-cols-[1fr,2fr] max-w-[1000px]">
                  <label>Collection Name:</label>
                  <input
                    id="collection-name"
                    value={name}
                    onChange={(e) => {
                      setIsError(false);
                      setName(e.target.value);
                    }}
                    placeholder="Collection Name*"
                    className={`
                  h-[50px] p-3 bg-white border font-light placeholder:text-placeholder rounded-md focus:border-pep-blue focus:outline-none
                  ${isError ? "border-error" : "border-pep-gray-border"}
                `}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-8 place-self-center">
              <Button
                id="cancel"
                buttonType="cancel"
                text="Cancel"
                onClick={onClose}
              />
              <Button
                id="create"
                buttonType="submit"
                text="Create"
                className="!font-light"
                onClick={handleConfirm}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
