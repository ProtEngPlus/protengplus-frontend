import Button from "../Button/Button";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect } from "react";

export type ConfirmOverlayProps = {
  id: string;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
};

export function ConfirmOverlay({
  isVisible,
  confirmProps,
}: {
  isVisible: boolean;
  confirmProps: ConfirmOverlayProps;
}) {
  const { id, onClose, onConfirm, title, message } = confirmProps;

  useEffect(() => {
    const $modalElement = document.querySelector(`#confirm-modal-${id}`);
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
        id={`#confirm-modal-${id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-gray-900/50"
      >
        <div className="modal-container bg-white opacity-100 border border-[#DFE4EA] rounded-lg px-8 py-5 space-y-11 w-fit m-auto shadow-dropShadow z-[100] text-center">
          <div className="modal-content">
            <h1 className="leading-loose">{title}</h1>
            <div className="bg-[#2578D3] rounded-md w-[90px] h-[3px] mx-auto mb-6" />
            <label className="font-light text-sm leading-6">{message}</label>
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
              id="confirm"
              buttonType="submit"
              text="Confirm"
              className="w-[190px] min-w-fit"
              onClick={onConfirm}
            />
          </div>
        </div>
      </div>
    )
  );
}
