import successIcon from "../../../assets/images/ModalOverlay/successIcon.svg";
import Button from "../Button/Button";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect } from "react";

export type SuccessOverlayProps = {
  id: string;
  onClose: () => void;
  title: string;
};

export function SuccessOverlay({
  isVisible,
  successProps,
}: {
  isVisible: boolean;
  successProps: SuccessOverlayProps;
}) {
  const { id, onClose, title } = successProps;

  useEffect(() => {
    const $modalElement = document.querySelector(`#success-modal-${id}`);
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
        id={`#success-modal-${id}`}
        tabIndex={-1}
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50"
      >
        <div className="modal-container max-w-[530px] w-fit bg-white space-y-9 rounded-lg px-8 py-5 m-auto shadow-dropShadow z-[100 text-center]">
          <img src={successIcon} alt="Success Icon" className="mx-auto" />
          <h1 className="leading-loose">{title}</h1>
          <div className="flex justify-center">
            <Button
              id="accept"
              buttonType="cancel"
              type="button"
              text="Accept"
              className="w-[190px] min-w-fit"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    )
  );
}
