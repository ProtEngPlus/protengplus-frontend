import { useEffect, useMemo, useState } from "react";
import Stepper from "../../../../commons/components/JobDetail/Stepper/Stepper";
import {
  JobInterface,
  Steps,
} from "../../../../commons/interfaces/Job.interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../../commons/components/Button/Button";
import { useFormContext } from "react-hook-form";
import { createJobConfig } from "../../../../commons/configs/createJobConfig";
import {
  ConfirmOverlay,
  ConfirmOverlayProps,
} from "../../../../commons/components/ModalOverlay/ConfirmOverlay";
import {
  SuccessOverlay,
  SuccessOverlayProps,
} from "../../../../commons/components/ModalOverlay/SuccessOverlay";
import ProteinQuery from "./JobDetailForm/ProteinQuery";
import ProteinRepresentation from "./JobDetailForm/ProteinRepresentation";
import TopModel from "./JobDetailForm/TopModel";
import Mutation from "./JobDetailForm/Mutation";
import {
  SaveConfigOverlay,
  SaveConfigProps,
} from "../Overlay/SaveConfigOverlay";
import { CreateJobConfiguration } from "../../../../commons/interfaces/CreateJob.interface";

export default function Pipeline({
  job,
  isEditPipeline,
  setIsEditPipeline,
}: {
  job: JobInterface;
  isEditPipeline: boolean;
  setIsEditPipeline: (isEditPipeline: boolean) => void;
}) {
  const { setValue } = useFormContext();
  const [currentStep, setCurrentStep] = useState(job.stage_id);
  const [isOpen, setIsOpen] = useState(false);

  // handle click outside for ...'s button
  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".custome-select") &&
        !target.closest(".dropdown-menu")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  });

  const subMethod = useMemo(() => {
    const tool = createJobConfig[Steps[currentStep - 1]].tool;
    return (
      Object.keys(tool).find(
        (key) => key.toLocaleLowerCase() === job.meta[currentStep - 1]
      ) ?? ""
    );
  }, [currentStep]);

  const jobConfig = useMemo(() => {
    return createJobConfig[Steps[currentStep - 1]].tool[subMethod];
  }, [currentStep, subMethod]);

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const ConfirmProps: ConfirmOverlayProps = {
    id: "confirm-update-job",
    onClose: () => {
      setIsConfirmVisible(false);
    },
    onConfirm: async () => {
      // update job
      setIsConfirmVisible(false);
      setIsSuccessVisible(true);
    },
    title: "Do you want to confirm edit?",
    message: "You made changes to this job configuration.",
  };

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const SuccessProps: SuccessOverlayProps = {
    id: "success-update-job",
    onClose: () => {
      setIsSuccessVisible(false);
      setIsEditPipeline(false);
    },
    title: "Job Successfull Updated",
  };

  const [isSaveConfigVisible, setIsSaveConfigVisible] = useState(false);
  const SaveConfigProps: SaveConfigProps = {
    onClose: () => {
      setIsSaveConfigVisible(false);
    },
    onConfirm: (name, description) => {
      setIsSaveConfigVisible(false);
      const jobConfig: CreateJobConfiguration = {
        name: name,
        description: description,
        ref_job_id: job.id,
        state: job.state,
        stage_id: job.stage_id,
        artifact: job.artifact ?? {},
        input_protein: job.input_protein,
        meta: job.meta,
        options: job.options,
        lab_result: job.lab_result,
        run_type: job.run_type,
        is_notification_on: job.is_notification_on,
        user_id: job.user_id,
      };
      //await create config
    },
  };
  return (
    <div>
      <ConfirmOverlay
        confirmProps={ConfirmProps}
        isVisible={isConfirmVisible}
      />
      <SuccessOverlay
        successProps={SuccessProps}
        isVisible={isSuccessVisible}
      />
      <SaveConfigOverlay
        isVisible={isSaveConfigVisible}
        saveConfigProps={SaveConfigProps}
      />
      <div className="space-y-8">
        <div className="space-y-24">
          <div className="flex space-x-6 items-center justify-end">
            <Icon
              icon={
                job.is_notification_on
                  ? "carbon:notification-filled"
                  : "carbon:notification-off-filled"
              }
              className={` cursor-pointer size-[30px] ${
                job.is_notification_on ? "text-pep-orange" : "text-error"
              }`}
              onClick={() =>
                setValue("is_notification_on", !job.is_notification_on)
              }
            />
            <div className="flex space-x-2 items-center">
              <Button
                id="auto-run"
                type="button"
                buttonType={job.run_type === "auto" ? "next" : "cancel"}
                text="Auto Run"
                className="inline-flex items-center whitespace-nowrap place-content-center text-center gap-2"
                onClick={() => setValue("run_type", "auto")}
              >
                <Icon
                  icon="fa-solid:running"
                  className={`w-[20px] h-[25px] ${
                    job.run_type === "auto" ? "text-white" : "text-pep-gray"
                  }`}
                />
              </Button>
              <Button
                id="one-step-run"
                type="button"
                buttonType={job.run_type === "one-step" ? "next" : "cancel"}
                text="One-Step Run"
                className="inline-flex items-center whitespace-nowrap place-content-center text-center gap-2"
                onClick={() => setValue("run_type", "one-step")}
              >
                <Icon
                  icon="ic:baseline-checklist-rtl"
                  className={`size-[20px] ${
                    job.run_type === "one-step" ? "text-white" : "text-pep-gray"
                  }`}
                />
              </Button>
            </div>
            <Icon
              icon="pepicons-pencil:dots-x"
              className="size-5 text-labwl cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
            {isOpen && (
              <ul className="dropdown-menu mt-[7rem] absolute w-[232px] min-w-fit bg-white rounded-md shadow-dropShadow z-10 py-2">
                <li
                  key="downlad-pdf"
                  className="px-5 py-2 font-light text-label hover:text-pep-blue hover:bg-pep-blue-light cursor-pointer"
                  onClick={() => {
                    if (isEditPipeline) {
                      setIsOpen(false);
                      setIsConfirmVisible(true);
                    } else {
                      setIsOpen(false);
                      {
                        /* download pdf */
                      }
                    }
                  }}
                >
                  Download PDF
                </li>
                <li
                  key="save-config"
                  className={`px-5 py-2 font-light text-label hover:text-pep-blue hover:bg-pep-blue-light cursor-pointer`}
                  onClick={() => {
                    if (isEditPipeline) {
                      setIsOpen(false);
                      setIsConfirmVisible(true);
                    } else {
                      setIsOpen(false);
                      setIsSaveConfigVisible(true);
                    }
                  }}
                >
                  Save Job's Configuration
                </li>
              </ul>
            )}
          </div>
          <Stepper
            state={job.state}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            stageId={job.stage_id}
            handleChange={() => {
              if (isEditPipeline) {
                setIsConfirmVisible(true);
                return false;
              }
              return true;
            }}
          />
        </div>
        <div className="rounded-lg border border-pep-gray-border px-6 py-8">
          {currentStep == 1 && (
            <ProteinQuery
              isEdit={isEditPipeline}
              currentStep={currentStep}
              currentSubMethod={subMethod}
              disable={job.stage_id > 1}
              handleChange={() =>
                isEditPipeline
                  ? setIsConfirmVisible(true)
                  : setIsEditPipeline(true)
              }
              jobConfig={jobConfig}
              stageId={job.stage_id}
            />
          )}
          {currentStep == 2 && (
            <ProteinRepresentation
              isEdit={isEditPipeline}
              currentStep={currentStep}
              currentSubMethod={subMethod}
              disable={job.stage_id > 1}
              handleChange={() =>
                isEditPipeline
                  ? setIsConfirmVisible(true)
                  : setIsEditPipeline(true)
              }
              jobConfig={jobConfig}
            />
          )}
          {currentStep == 3 && (
            <TopModel
              isEdit={isEditPipeline}
              currentStep={currentStep}
              currentSubMethod={subMethod}
              disable={job.stage_id > 1}
              handleChange={() =>
                isEditPipeline
                  ? setIsConfirmVisible(true)
                  : setIsEditPipeline(true)
              }
              jobConfig={jobConfig}
            />
          )}
          {currentStep == 4 && (
            <Mutation
              isEdit={isEditPipeline}
              currentStep={currentStep}
              currentSubMethod={subMethod}
              disable={job.stage_id > 1}
              handleChange={() =>
                isEditPipeline
                  ? setIsConfirmVisible(true)
                  : setIsEditPipeline(true)
              }
              jobConfig={jobConfig}
            />
          )}
        </div>
      </div>
    </div>
  );
}
