import { useEffect, useMemo, useState } from "react";
import Stepper from "../../../../commons/components/JobDetail/Stepper/Stepper";
import {
  JobInterface,
  Steps,
} from "../../../../commons/interfaces/Job.interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../../commons/components/Button/Button";
import { useFormContext } from "react-hook-form";
import {
  createJobConfig,
  defaultPipeline,
  Pipelines,
} from "../../../../commons/configs/createJobConfig";
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
import {
  CreateJobConfiguration,
  CreateJobOption,
  PipelineItem,
} from "../../../../commons/interfaces/CreateJob.interface";
import {
  createJobConfiguration,
  updateJobDetail,
} from "../../../../commons/api/job";

export default function Pipeline({
  job,
  isEditPipeline,
  setIsEditPipeline,
  fetchJob,
}: {
  job: JobInterface;
  isEditPipeline: boolean;
  setIsEditPipeline: (isEditPipeline: boolean) => void;
  fetchJob: () => void;
}) {
  const { setValue, watch } = useFormContext();
  const [currentStep, setCurrentStep] = useState(job.stage_id);
  const [isOpen, setIsOpen] = useState(false);
  const [pipeline, setPipeline] = useState<PipelineItem[]>(defaultPipeline);

  useEffect(() => {
    const updatedPipeline = [...pipeline];

    job.meta.forEach((subMethod, index) => {
      Pipelines[index].subMethod.forEach((value) => {
        if (value.toLowerCase() === subMethod) {
          updatedPipeline[index] = {
            ...updatedPipeline[index],
            subMethod: value,
          };
        }
      });
    });
    setPipeline(updatedPipeline);
  }, [job.meta]);

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

  const jobConfig = useMemo(() => {
    return createJobConfig[Steps[currentStep]]?.tool[
      pipeline[currentStep].subMethod
    ];
  }, [currentStep, pipeline]);

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const ConfirmProps: ConfirmOverlayProps = {
    id: "confirm-update-job",
    onClose: () => {
      setIsConfirmVisible(false);
    },
    onConfirm: async () => {
      await handleJobUpdate();
      fetchJob();
    },
    title: "Do you want to confirm edit?",
    message: "You made changes to this job configuration.",
  };

  const handleJobUpdate = async () => {
    try {
      const data = watch();
      const newJobOption = {} as CreateJobOption;
      const meta = [] as string[];
      for (const step of pipeline) {
        const { method, subMethod }: { method: string; subMethod: string } =
          step;
        meta.push(subMethod.toLowerCase());
        newJobOption[subMethod.toLowerCase()] = {};
        const jobConfig = createJobConfig[method].tool[subMethod].parameters;

        jobConfig.forEach((param) => {
          if (param.type === "rangeNumber") {
            newJobOption[subMethod.toLowerCase()][`${param.id}_low`] =
              data[`${param.id}_low`];
            newJobOption[subMethod.toLowerCase()][`${param.id}_high`] =
              data[`${param.id}_high`];
          } else {
            newJobOption[subMethod.toLowerCase()][param.id] = data[param.id];
          }
        });
      }
      await updateJobDetail(job.id, { meta: meta, options: newJobOption });
      setIsConfirmVisible(false);
      setIsSuccessVisible(true);
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const SuccessProps: SuccessOverlayProps = {
    id: "success-update-job",
    onClose: () => {
      setIsSuccessVisible(false);
      setIsEditPipeline(false);
    },
    title: "Job Successfully Updated",
  };

  const [isSaveConfigVisible, setIsSaveConfigVisible] = useState(false);
  const SaveConfigProps: SaveConfigProps = {
    onClose: () => {
      setIsSaveConfigVisible(false);
    },
    onConfirm: async (name, description) => {
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

      await createJobConfiguration(jobConfig);
    },
  };

  const runType = watch("run_type");
  const isNotificationOn = watch("is_notification_on");

  useEffect(() => {
    const updateJob = async () => {
      await updateJobDetail(job.id, {
        run_type: runType,
        is_notification_on: isNotificationOn,
      });
    };

    updateJob();
  }, [runType, isNotificationOn, job.id]);

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
                isNotificationOn
                  ? "carbon:notification-filled"
                  : "carbon:notification-off-filled"
              }
              className={` cursor-pointer size-[30px] ${
                isNotificationOn ? "text-pep-orange" : "text-error"
              }`}
              onClick={() => setValue("is_notification_on", !isNotificationOn)}
            />
            <div className="flex space-x-2 items-center">
              <Button
                id="auto-run"
                type="button"
                buttonType={runType === "auto" ? "next" : "cancel"}
                text="Auto Run"
                className="inline-flex items-center whitespace-nowrap place-content-center text-center gap-2"
                onClick={() => setValue("run_type", "auto")}
              >
                <Icon
                  icon="fa-solid:running"
                  className={`w-[20px] h-[25px] ${
                    runType === "auto" ? "text-white" : "text-pep-gray"
                  }`}
                />
              </Button>
              <Button
                id="one-step-run"
                type="button"
                buttonType={runType === "one-step" ? "next" : "cancel"}
                text="One-Step Run"
                className="inline-flex items-center whitespace-nowrap place-content-center text-center gap-2"
                onClick={() => setValue("run_type", "one-step")}
              >
                <Icon
                  icon="ic:baseline-checklist-rtl"
                  className={`size-[20px] ${
                    runType === "one-step" ? "text-white" : "text-pep-gray"
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
                  className={`px-5 py-2 font-light text-label ${
                    job.state === "COMPLETED"
                      ? "cursor-pointer hover:text-pep-blue hover:bg-pep-blue-light"
                      : "cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (isEditPipeline) {
                      setIsOpen(false);
                      setIsConfirmVisible(true);
                    } else if (job.state === "COMPLETED") {
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
          {currentStep === 0 && (
            <ProteinQuery
              isEdit={isEditPipeline}
              currentStep={currentStep}
              disable={job.stage_id > 0}
              handleChange={() =>
                isEditPipeline
                  ? setIsConfirmVisible(true)
                  : setIsEditPipeline(true)
              }
              jobConfig={jobConfig}
              stageId={job.stage_id}
              state={job.state}
              pipeline={pipeline}
              setPipeline={setPipeline}
            />
          )}
          {currentStep === 1 && (
            <ProteinRepresentation
              isEdit={isEditPipeline}
              stageId={job.stage_id}
              currentStep={currentStep}
              disable={job.stage_id >= 1}
              handleChange={() =>
                isEditPipeline
                  ? setIsConfirmVisible(true)
                  : setIsEditPipeline(true)
              }
              jobConfig={jobConfig}
              pipeline={pipeline}
              setPipeline={setPipeline}
            />
          )}
          {currentStep === 2 && (
            <TopModel
              isEdit={isEditPipeline}
              stageId={job.stage_id}
              currentStep={currentStep}
              disable={job.stage_id >= 2}
              handleChange={() =>
                isEditPipeline
                  ? setIsConfirmVisible(true)
                  : setIsEditPipeline(true)
              }
              jobConfig={jobConfig}
              pipeline={pipeline}
              setPipeline={setPipeline}
            />
          )}
          {currentStep === 3 && (
            <Mutation
              isEdit={isEditPipeline}
              stageId={job.stage_id}
              currentStep={currentStep}
              disable={job.stage_id >= 3}
              handleChange={() =>
                isEditPipeline
                  ? setIsConfirmVisible(true)
                  : setIsEditPipeline(true)
              }
              jobConfig={jobConfig}
              pipeline={pipeline}
              setPipeline={setPipeline}
            />
          )}
        </div>
      </div>
    </div>
  );
}
