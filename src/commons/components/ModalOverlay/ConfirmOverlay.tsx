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
        backdropClasses: "bg-gray-900/50 fixed inset-0 z-10",
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

  useEffect(() => {
    if (isVisible) {
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault(); // Prevent scrolling
      };
      window.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        window.removeEventListener("wheel", handleWheel);
      };
    }
  }, [isVisible]);

  return (
    isVisible && (
      <div
        id={`#confirm-modal-${id}`}
        tabIndex={-1}
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50 scroll"
      >
        <div className="modal-container max-w-[530px] w-fit bg-white opacity-100 border border-pep-gray-border rounded-lg px-8 py-5 space-y-11 m-auto shadow-dropShadow z-[100] text-center">
          <div className="modal-content">
            <h1 className="leading-loose ">{title}</h1>
            <div className="bg-pep-blue rounded-md w-[90px] h-[3px] mx-auto mb-6" />
            <label className="font-light text-sm leading-6">{message}</label>
          </div>
          <div className="flex flex-row space-x-4 place-content-center">
            <Button
              id="cancel"
              type="button"
              buttonType="cancel"
              text="Cancel"
              className="w-[190px] min-w-fit"
              onClick={onClose}
            />
            <Button
              id="confirm"
              type="button"
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
