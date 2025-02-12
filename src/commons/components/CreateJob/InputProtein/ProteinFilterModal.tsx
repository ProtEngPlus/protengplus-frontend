import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect } from "react";
import {
  createJobConfig,
  MethodParameter,
} from "../../../configs/createJobConfig";
import GetInputField from "../InputField/GetInputField";
import { useFormContext } from "react-hook-form";
import Button from "../../Button/Button";
import searchIcon from "../../../../assets/images/CreateJob/searchIcon.svg";

export type ProteinFilterProps = {
  onClose: () => void;
};

export function ProteinFilterModal({
  isVisible,
  proteinFilterProps,
}: {
  isVisible: boolean;
  proteinFilterProps: ProteinFilterProps;
}) {
  const { onClose } = proteinFilterProps;
  const proteinConfig =
    createJobConfig["Protein Input"]?.tool["Protein Input Config"];

  const { getValues } = useFormContext();

  const proteinValue = getValues("Protein Input.Protein Input Config");

  useEffect(() => {
    const $modalElement = document.querySelector("protein-filter-modal");

    let modal: ModalInterface | null = null;

    if ($modalElement instanceof HTMLElement && isVisible) {
      const modalOptions: ModalOptions = {
        placement: "bottom-right",
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
        id="protein-filter-modal"
        className="fixed top-0 right-0 left-0 z-[90] flex justify-center items-center w-full h-full mt-0"
      >
        <div className="bg-white p-5 space-y-5 place-items-center place-self-center w-[944px] min-w-fit place-content-center text-center">
          <div className="w-full flex rounded-xl px-5 py-6 border border-pep-gray-border gap-x-4 place-items-start">
            <div className="grow flex text-center place-items-center space-x-2">
              <Icon
                icon="eos-icons:organisms-outlined"
                className="size-6 text-pep-gray"
              />
              <label className="text-center text-nowrap font-light">
                Organism:
              </label>
              <div className="relative flex items-center grow">
                <input
                  id="search-organism"
                  placeholder="Search organism"
                  className="grow text-wrap h-[50px] w-full min-w-fit pl-10 pr-3 bg-white border font-light placeholder:text-placeholder rounded-md focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled disabled:text-label"
                />
                <img
                  src={searchIcon}
                  alt="search"
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer"
                />
              </div>
            </div>

            <div className="w-fit text-start">
              {proteinConfig.parameters.map((value) => (
                <GetInputField
                  key={value.id}
                  id={value.id}
                  type={value.type}
                  label={value.name}
                  options={value.dropdownItems}
                  value={{
                    low: Number(proteinValue[`${value.id}_low`]),
                    high: Number(proteinValue[`${value.id}_high`]),
                  }}
                  additionalValidation={value.additionalValidation}
                />
              ))}
            </div>
          </div>
          <div className="space-x-4 w-fit place-self-end">
            <Button
              id="reset"
              type="button"
              buttonType="cancel"
              text="Reset"
              className="h-[34px] items-center !p-0"
            />
            <Button
              id="filter"
              type="button"
              buttonType="submit"
              text="Filter"
              className="h-[34px] items-center !p-0 font-normal"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    )
  );
}
