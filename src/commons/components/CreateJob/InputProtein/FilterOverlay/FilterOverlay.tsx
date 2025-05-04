import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect, useState } from "react";
import { createJobConfig } from "../../../../configs/createJobConfig";
import GetInputField from "../../InputField/GetInputField";
import { useFormContext } from "react-hook-form";
import Button from "../../../Button/Button";
import SearchBar from "./SearchBar";
import { Icon } from "@iconify/react/dist/iconify.js";

export type FilterOverlayProps = {
  organismList: string[];
  organisms: string | undefined;
  percentIdentityFrom: number | undefined;
  percentIdentityTo: number | undefined;
  eValuesFrom: number | undefined;
  eValuesTo: number | undefined;
  queryCoverFrom: number | undefined;
  queryCoverTo: number | undefined;
  onClose: () => void;
  onConfirm: () => void;
  onReset: () => void;
};

export function FilterOverlay({
  isVisible,
  filterOverlayProps,
}: {
  isVisible: boolean;
  filterOverlayProps: FilterOverlayProps;
}) {
  const {
    organismList,
    organisms,
    percentIdentityFrom,
    percentIdentityTo,
    eValuesFrom,
    eValuesTo,
    queryCoverFrom,
    queryCoverTo,
    onReset,
    onConfirm,
  } = filterOverlayProps;

  const proteinConfig = createJobConfig["Protein Input"]?.tool["Query Result"];
  const { getValues, setValue } = useFormContext();
  const [search, setSearch] = useState<string>("");
  const [isRead, setRead] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const $modalElement = document.querySelector("#protein-filter-modal");
    let modal: ModalInterface | null = null;

    if ($modalElement instanceof HTMLElement && isVisible && !isLoading) {
      const modalOptions: ModalOptions = {
        placement: "bottom-right",
        backdrop: "dynamic",
        backdropClasses:
          "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-10",
        closable: true,
      };

      modal = new Modal($modalElement, modalOptions);
      modal.show();
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }

    return () => {
      if (modal) {
        modal.hide();
      }
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, [isVisible]);

  // Preload form values when modal is opened
  useEffect(() => {
    setLoading(true);
    setSearch(organisms ?? "");
    setValue("percent_identity_result_low", percentIdentityFrom);
    setValue("percent_identity_result_high", percentIdentityTo);
    setValue("e_values_result_low", eValuesFrom);
    setValue("e_values_result_high", eValuesTo);
    setValue("query_cover_result_low", queryCoverFrom);
    setValue("query_cover_result_high", queryCoverTo);

    setTimeout(() => setLoading(false), 0);
  }, [isVisible]);

  // handle clicking Filter button
  const handleConfirm = () => {
    setValue("organisms", search);
    setValue("percentIdentityFrom", getValues("percent_identity_result_low"));
    setValue("percentIdentityTo", getValues("percent_identity_result_high"));
    setValue("eValuesFrom", getValues("e_values_result_low"));
    setValue("eValuesTo", getValues("e_values_result_high"));
    setValue("queryCoverFrom", getValues("query_cover_result_low"));
    setValue("queryCoverTo", getValues("query_cover_result_high"));

    onConfirm();
  };

  // helper text for query result
  const HelperText = (
    <div className="w-full flex rounded-xl px-5 py-6 border border-pep-gray-border gap-x-4 place-items-start font-light text-label">
      <div className="flex text-center place-items-center space-x-2 h-[50px]">
        <Icon
          icon="eos-icons:organisms-outlined"
          className="size-6 text-pep-gray"
        />
        <label className="text-center text-nowrap font-light">Organism:</label>
        <div className="flex grow">
          The specific species or biological entity from which the protein
          sequence originates
        </div>
      </div>

      <div className="text-start w-[231px]">
        {proteinConfig.parameters?.map((value) => {
          if (value.id !== "organism")
            return (
              <div key={value.id} className="flex flex-col space-y-2">
                <span className="text-nowrap leading-[48px]">{value.name}</span>
                <span className="text-wrap text-sm">{value.description}</span>
              </div>
            );
        }) || undefined}
      </div>
    </div>
  );

  return (
    isVisible &&
    !isLoading && (
      <div
        data-testid="protein-filter-modal"
        id="protein-filter-modal"
        className="fixed top-0 right-0 left-0 z-[90] flex justify-center items-center w-full h-full mt-0"
      >
        <div className="bg-white p-5 space-y-5 place-items-center place-self-center w-[944px] min-w-fit min-h-[400px] place-content-center text-center">
          {isRead ? (
            HelperText
          ) : (
            <div className="w-full max-h-[290px] flex rounded-xl px-5 py-6 border border-pep-gray-border gap-x-4 place-items-start justify-between">
              <div className="grow">
                <SearchBar
                  search={search}
                  setSearch={setSearch}
                  organismList={organismList}
                />
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
                      low: undefined,
                      high: undefined,
                    }}
                    additionalValidation={value.additionalValidation}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4 w-fit h-fit ml-auto mb-0">
            <Icon
              icon="material-symbols:info-outline"
              className={`size-8 cursor-pointer ${
                isRead ? "text-pep-blue" : "text-pep-gray"
              } `}
              onClick={() => setRead(!isRead)}
            />
            <Button
              id="reset"
              type="button"
              buttonType="cancel"
              text="Reset"
              className="h-[34px] items-center !p-0"
              onClick={onReset}
            />
            <Button
              id="filter"
              type="button"
              buttonType="submit"
              text="Filter"
              className="h-[34px] items-center !p-0 font-normal"
              onClick={handleConfirm}
            />
          </div>
        </div>
      </div>
    )
  );
}
