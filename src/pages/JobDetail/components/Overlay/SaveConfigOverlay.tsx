import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect, useState } from "react";
import onEditIcon from "../../../../assets/images/CreateJob/onEditIcon.svg";
import Button from "../../../../commons/components/Button/Button";

export type SaveConfigProps = {
  onClose: () => void;
  onConfirm: (name: string, description: string) => void;
};

export function SaveConfigOverlay({
  isVisible,
  saveConfigProps,
}: {
  isVisible: boolean;
  saveConfigProps: SaveConfigProps;
}) {
  const { onClose, onConfirm } = saveConfigProps;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const handleConfirm = () => {
    if (name.length === 0) {
      setIsError(true);
    } else {
      onConfirm(name, description);
    }
  };

  useEffect(() => {
    const $modalElement = document.querySelector("#save-config-modal");

    let modal: ModalInterface | null = null;

    if ($modalElement instanceof HTMLElement && isVisible) {
      const modalOptions: ModalOptions = {
        placement: "bottom-right",
        backdrop: "dynamic",
        backdropClasses:
          "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-10",
        closable: true,
      };

      modal = new Modal($modalElement, modalOptions);
      modal.show();
    }

    return () => {
      if (modal) {
        modal.hide();
      }
    };
  }, [isVisible]);

  return (
    isVisible && (
      <div
        id="save-config-modal"
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
                New Configuration
              </span>
            </div>

            <div className="bg-white rounded-lg p-8 grid grid-cols-[1fr,3fr] gap-x-3 gap-y-4 font-light text-start">
              <label>Confiuration Name:</label>
              <input
                id="config-name"
                value={name}
                onChange={(e) => {
                  setIsError(false);
                  setName(e.target.value);
                }}
                placeholder="Configuration Name*"
                className={`
                  h-[50px] w-full p-3 bg-white border font-light placeholder:text-placeholder rounded-md focus:border-pep-blue focus:outline-none
                  ${isError ? "border-error" : "border-pep-gray-border"}
                `}
                autoComplete="off"
              />
              <label>Description:</label>
              <div>
                <textarea
                  id="config-description"
                  maxLength={50}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Configuration Description"
                  className="min-h-[188px] w-full p-3 bg-white border border-pep-gray-border font-light placeholder:text-placeholder rounded-md focus:ring-0 focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-100 disabled:text-label"
                  autoComplete="off"
                />
                <div className="w-full flex justify-end text-sm font-light">
                  <span className="text-black">{description.length}/50</span>
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
