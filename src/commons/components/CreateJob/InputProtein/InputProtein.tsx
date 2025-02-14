import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../Button/Button";
import { useFormContext } from "react-hook-form";
import InputProteinTable, { ResultProps } from "./InputProteinTable";
import DownloadCSVButton from "../../Button/DownloadCSVButton";
import ViewButton from "../../Button/ViewButton";
import searchIcon from "../../../../assets/images/CreateJob/searchIcon.svg";
import { useState } from "react";
import { ProteinFilterModal, ProteinFilterProps } from "./ProteinFilterModal";
import {
  ProteinWithTableOverlay,
  ProteinWithTableOverlayProps,
} from "./InputProteinWithTableOverlay";

interface Props {
  onEdit: boolean;
  inputProtein: string;
  jobWithConfig?: boolean;
  initialStep: number;
  isConclusion?: boolean;
}

const result: ResultProps[] = [
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
  {
    description: "asparagine synthetase A [Escherichia coli]",
    scientificName: "Escherichia coli",
    maxScore: 50.1,
    totalScore: 50.1,
    queryCover: "63%",
    eValue: 3e-6,
    percIdent: "72.2%",
    accLen: 37,
    accession: "MCT7423503.1",
  },
];

export default function InputProtein({
  onEdit,
  inputProtein,
  jobWithConfig = true,
  initialStep,
  isConclusion = false,
}: Props) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormContext();
  const inputMode = watch("input_mode") ?? "prot_seq";

  const [isFilterVisible, setFilterVisible] = useState(false);
  const ProteinFilterProps: ProteinFilterProps = {
    onClose: () => setFilterVisible(false),
  };

  const [isProteinWithTableVisible, setProteinWithTableVisible] =
    useState(false);
  const ProteinWithTableOverlayProps: ProteinWithTableOverlayProps = {
    onClose: () => setProteinWithTableVisible(false),
    inputProtein: inputProtein,
    onEdit: onEdit,
    result: result,
  };

  return (
    <div>
      <ProteinWithTableOverlay
        isVisible={isProteinWithTableVisible}
        setFilterVisible={setFilterVisible}
        proteinWithTableProps={ProteinWithTableOverlayProps}
      />
      <ProteinFilterModal
        isVisible={isFilterVisible}
        proteinFilterProps={ProteinFilterProps}
      />

      <div className="space-y-12">
        {/* Header Section */}
        <div
          className={`space-y-[10px] rounded-lg border-pep-gray-border ${
            onEdit ? "bg-pep-blue-light p-5" : ""
          } `}
        >
          <div className="flex items-center space-x-3">
            <Icon icon="hugeicons:dna" className="size-6 text-pep-gray" />
            <label className="text-center text-nowrap font-light">
              Input Protein
            </label>
            {onEdit && (
              <div className="flex-grow flex items-center space-x-3">
                <div className="grow">
                  <div className="relative items-center">
                    <input
                      disabled={initialStep > 1}
                      id="input_protein"
                      placeholder="Input Protein*"
                      className={`text-wrap h-[50px] w-full min-w-fit pl-3 pr-10 bg-white border font-light placeholder:text-placeholder rounded-md focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled disabled:text-label ${
                        errors.input_protein
                          ? "border-error"
                          : "border-gray-border"
                      }`}
                      {...register("input_protein", {
                        validate:
                          inputMode === "prot_seq"
                            ? {
                                required: (value) =>
                                  !!value || "Protein input is required",
                                pattern: (value) =>
                                  /^(?!.*ATGC)(?!.*atgc)[A-IK-NP-TVWY]*$|^(?!.*ATGC)(?!.*atgc)[a-ik-np-tvwy]*$/.test(
                                    value
                                  ) || "Incorrect protein sequence format.",
                              }
                            : undefined,
                      })}
                      onBlur={() => {
                        if (inputMode === "prot_seq") {
                          trigger("input_protein");
                        }
                      }}
                      autoComplete="off"
                    />
                    <img
                      src={searchIcon}
                      alt="search"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    />
                  </div>
                  {errors.input_protein && inputMode === "prot_seq" && (
                    <span className="absolute font-light text-error text-xs">
                      {typeof errors.input_protein.message === "string"
                        ? errors.input_protein.message
                        : ""}
                    </span>
                  )}
                </div>
                <Button
                  disabled={initialStep > 1}
                  id="prot_seq"
                  buttonType={inputMode === "prot_seq" ? "submit" : "cancel"}
                  type="button"
                  onClick={() => setValue("input_mode", "prot_seq")}
                  text="Amino Acid Sequence"
                  className="!font-light !p-0 w-[100px] text-sm"
                />

                <Button
                  disabled={initialStep > 1}
                  id="uniprot_id"
                  buttonType={inputMode === "uniprot_id" ? "submit" : "cancel"}
                  type="button"
                  onClick={() => setValue("input_mode", "uniprot_id")}
                  text="UniprotID"
                  className="!font-light !p-0 w-[100px] text-sm"
                />

                <ViewButton
                  inputProtein={inputProtein}
                  disable={
                    inputMode === "prot_seq" &&
                    (!!errors.input_protein || !watch("input_protein"))
                  }
                />
              </div>
            )}

            {!onEdit && (
              <div className="flex-grow flex items-center space-x-3">
                <div className="grow truncate">{inputProtein}</div>
                {isConclusion && jobWithConfig ? (
                  <Button
                    id="btn-view-protein-with-table"
                    buttonType="cancel"
                    type="button"
                    text="View"
                    className="w-fit px-3 py-2 font-normal inline-flex items-center whitespace-nowrap place-content-center text-center gap-3 text-pep-dark-gray"
                    onClick={() => {
                      setProteinWithTableVisible(true);
                    }}
                  >
                    <Icon
                      icon="carbon:view"
                      className="size-[30px] text-pep-gray"
                    />
                  </Button>
                ) : (
                  <ViewButton
                    inputProtein={inputProtein}
                    disable={
                      inputMode === "prot_seq" &&
                      (!!errors.input_protein || !watch("input_protein"))
                    }
                  />
                )}
                <DownloadCSVButton />
              </div>
            )}
          </div>

          {/*--------------------------- Input Protein Table -------------------------------*/}
          {onEdit && jobWithConfig && (
            <InputProteinTable
              isOverlay={false}
              onEdit={onEdit}
              result={result}
              setFilterVisible={setFilterVisible}
            />
          )}
        </div>
        {/* Note for Non-configurable Jobs - create job */}
        {!isConclusion && onEdit && !jobWithConfig && (
          <div className="text-center text-label font-light">
            Note: Blast Results can be manually filtered and selected only in{" "}
            <span className="text-pep-orange font-normal">'One-Step Run'</span>{" "}
            mode
          </div>
        )}
      </div>
    </div>
  );
}
