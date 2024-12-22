import Button from "../Button/Button";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect } from "react";
import deleteIcon from "../../../assets/images/ModalOverlay/deleteIcon.png";

export type DeleteOverlayProps = {
  id: string;
  onClose: () => void;
  onDelete: () => void;
  title: string;
  children?: any;
};

export function DeleteOverlay({
  isVisible,
  deleteProps,
}: {
  isVisible: boolean;
  deleteProps: DeleteOverlayProps;
}) {
  const { id, onClose, onDelete, title, children } = deleteProps;

  useEffect(() => {
    const $modalElement = document.querySelector(`#delete-modal-${id}`);
    let modal: ModalInterface | null = null;

    if ($modalElement instanceof HTMLElement && isVisible) {
      const modalOptions: ModalOptions = {
        placement: "bottom-right",
        backdrop: "dynamic",
        backdropClasses:
          "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-10",
        closable: true,
        onHide: () => console.log("Confirm modal is hidden"),
        onShow: () => console.log("Confirm modal is shown"),
      };

      modal = new Modal($modalElement, modalOptions);
      modal.show();
    }

    return () => {
      if (modal) {
        modal.hide(); // Hide the modal if it was instantiated
      }
    };
  }, [isVisible]);

  return (
    isVisible && (
      <div
        id={`#delete-modal-${id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50"
      >
        <div className="modal-container bg-white opacity-100 border border-pep-gray-border rounded-lg px-8 py-5 space-y-11 w-fit m-auto shadow-dropShadow z-[100] text-center">
          <div className="modal-content">
            <img src={deleteIcon} alt="Delete Icon" className="mx-auto" />
            <h1 className="leading-loose">{title}</h1>
            {children}
          </div>
          <div className="flex flex-row space-x-4">
            <Button
              id="cancel"
              buttonType="cancel"
              text="Cancel"
              className="w-[190px] min-w-fit"
              onClick={onClose}
            />
            <Button
              id="delete"
              buttonType="delete"
              text="Delete"
              className="w-[190px] min-w-fit"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    )
  );
}
