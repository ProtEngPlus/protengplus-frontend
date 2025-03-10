import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect, useState } from "react";
import { createJobConfig } from "../../../../configs/createJobConfig";
import GetInputField from "../../InputField/GetInputField";
import { useFormContext } from "react-hook-form";
import Button from "../../../Button/Button";
import SearchBar from "./SearchBar";

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
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const $modalElement = document.querySelector("protein-filter-modal");

    let modal: ModalInterface | null = null;

    if ($modalElement instanceof HTMLElement && isVisible && !isLoading) {
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

  useEffect(() => {
    if (isVisible) {
      setLoading(true);
      setSearch(organisms ?? "");
      setValue("percent_identity_result_low", percentIdentityFrom);
      setValue("percent_identity_result_high", percentIdentityTo);
      setValue("e_values_result_low", eValuesFrom);
      setValue("e_values_result_high", eValuesTo);
      setValue("query_cover_result_low", queryCoverFrom);
      setValue("query_cover_result_high", queryCoverTo);

      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  }, [isVisible]);

  const handleConfirm = () => {
    setValue("organisms", search);
    setValue(
      "percentIdentityFrom",
      getValues("percent_identity_result_low") ?? undefined
    );
    setValue(
      "percentIdentityTo",
      getValues("percent_identity_result_high") ?? undefined
    );
    setValue("eValuesFrom", getValues("e_values_result_low") ?? undefined);
    setValue("eValuesTo", getValues("e_values_result_high") ?? undefined);
    setValue(
      "queryCoverFrom",
      getValues("query_cover_result_low") ?? undefined
    );
    setValue("queryCoverTo", getValues("query_cover_result_high") ?? undefined);

    onConfirm();
  };

  return (
    isVisible &&
    !isLoading && (
      <div
        id="protein-filter-modal"
        className="fixed top-0 right-0 left-0 z-[90] flex justify-center items-center w-full h-full mt-0"
      >
        <div className="bg-white p-5 space-y-5 place-items-center place-self-center w-[944px] max-h-[400px] min-w-fit place-content-center text-center">
          <div className="w-full flex rounded-xl px-5 py-6 border border-pep-gray-border gap-x-4 place-items-start">
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
          <div className="space-x-4 w-fit ml-auto">
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
