import { useState } from "react";
import {
  CreateJobInterface,
  CreateJobDetailInterface,
  PipelineItem,
  CreateJobInfo,
} from "../../commons/interfaces/CreateJob.interface";
import {
  createJobConfig,
  defaultCreateJobDetail,
  defaultPipeline,
  steps,
} from "../../commons/configs/createJobConfig";
import {
  generateInitialJobConfig,
  generateInitialJob,
} from "./services/CreateJobConfig";
import { JobResponse } from "../../commons/interfaces/Job.interface";
import CreateJob from "./components/CreateJobOptions/CreateJob";
import CreateJobWithConfig from "./components/CreateJobOptions/CreateJobWithConfig";
import ProteinQuery from "./components/CreateJobForm/ProteinQuery/ProteinQuery";
import ProteinRepresentation from "./components/CreateJobForm/ProteinRepresentation/ProteinRepresentation";
import UploadLabInput from "./components/CreateJobForm/UploadLabInput/UploadLabInput";
import TopModel from "./components/CreateJobForm/TopModel/TopModel";
import Mutation from "./components/CreateJobForm/Mutation/Mutation";
import Stepper from "../../commons/components/CreateJob/Stepper/Stepper";
import Button from "../../commons/components/Button/Button";
import Conclusion from "./components/CreateJobForm/Conclusion/Conclusion";
import { FormProvider, useForm } from "react-hook-form";
import {
  SuccessOverlay,
  SuccessOverlayProps,
} from "../../commons/components/ModalOverlay/SuccessOverlay";
import {
  ConfirmOverlay,
  ConfirmOverlayProps,
} from "../../commons/components/ModalOverlay/ConfirmOverlay";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../commons/hooks/useAuth";

export default function CreateJobPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isWithConfig, setIsWithConfig] = useState(false);
  const [initialStep, setInitialStep] = useState(1);
  const [state, setState] = useState(0);
  const [pipeline, setPipeline] = useState<PipelineItem[]>(defaultPipeline);
  const [jobDetail, setJobDetail] = useState<CreateJobDetailInterface>(
    defaultCreateJobDetail
  );
  const [jobInfo, setJobInfo] = useState<CreateJobInterface>(
    generateInitialJob()
  );

  const form = useForm({
    defaultValues: { file_name: "", ...jobDetail, ...jobInfo },
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  // initial job info (state 0)
  const initialJobInfo = (job?: JobResponse, stepConfig?: number) => {
    if (!isWithConfig) {
      setInitialStep(1);
      setJobInfo(generateInitialJob());
      setPipeline(defaultPipeline);
      setState(1);
    } else if (job && stepConfig) {
      const data = generateInitialJobConfig(job);
      reset({
        ...data.initialInfo,
        ...data.initialJob,
        file_name: job.lab_result.total > 0 ? "recent_lab_result" : "",
      });

      setJobInfo(data.initialJob);
      setJobDetail(data.initialInfo);
      setPipeline(data.pipelineItem);
      setState(stepConfig);
    }
  };

  const handleBack = () => {
    setState(state - 1);
  };

  const changeState = (nextState: number) => {
    handleSubmit(
      (data: any) => {
        console.log(data);
        if (nextState <= steps.length) {
          setState(nextState);
        }
      },
      (errors) => {
        console.log("Validation errors:", errors);
      }
    )();
  };

  // update info after clicking confirm (conclusion)
  const updateInfo = (): Promise<{
    detail: CreateJobDetailInterface;
    info: CreateJobInfo;
    meta: string[];
  }> => {
    return new Promise((resolve, reject) => {
      const newJobInfo = {} as CreateJobInfo;
      const meta = [] as string[];

      handleSubmit(
        (data: any) => {
          try {
            // Update jobDetail -> assign each key
            const newJobDetail: CreateJobDetailInterface = {
              description: data["description"],
              input_protein: data["input_protein"],
              is_notification_on: data["is_notification_on"],
              lab_result: data["lab_result"],
              name: data["name"],
              run_type: data["run_type"],
            };

            // Update newJobInfo
            for (const step of pipeline) {
              const {
                method,
                subMethod,
              }: { method: string; subMethod: string } = step;
              meta.push(subMethod.toLowerCase());
              newJobInfo[subMethod.toLowerCase()] = {};
              const jobConfig =
                createJobConfig[method].tool[subMethod].parameters;

              jobConfig.forEach((param) => {
                newJobInfo[subMethod.toLowerCase()][param.id] =
                  data[param.id] ?? data[method][subMethod][param.id];
              });
            }

            resolve({ detail: newJobDetail, info: newJobInfo, meta: meta });
          } catch (error) {
            reject(error);
          }
        },
        (errors) => {
          console.log("Validation errors:", errors);
          reject(errors);
        }
      )();
    });
  };

  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const ConfirmProps: ConfirmOverlayProps = {
    id: "confirm-create-job",
    onClose: () => {
      setConfirmVisible(false);
    },
    onConfirm: async () => {
      setConfirmVisible(false);
      const { detail, info, meta } = await updateInfo();
      console.log("confirm data", {
        stage_id: 0,
        user_id: user?.id,
        option: { ...info },
        ...detail,
        meta,
      });
      try {
        setSuccessVisible(true);
      } catch (error) {
        console.error(error);
      }
    },
    title: "Do you want to create this job?",
    message: "You can modify this setup later from the job detail page.",
  };

  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const SuccessProps: SuccessOverlayProps = {
    id: "success-create-job",
    onClose: () => {
      setSuccessVisible(false);
      navigate("/dashboard");
    },
    title: "Job Successfully Created",
  };

  return (
    <div className="h-full items-center justify-center">
      <ConfirmOverlay
        isVisible={isConfirmVisible}
        confirmProps={ConfirmProps}
      />
      <SuccessOverlay
        isVisible={isSuccessVisible}
        successProps={SuccessProps}
      />
      {/* ------------------- Create job option ---------------------- */}
      {state === 0 && !isWithConfig && (
        <CreateJob
          createJob={() => initialJobInfo()}
          createJobWithConfig={() => setIsWithConfig(true)}
        />
      )}
      {/* ------------------- Create job with config's option ---------------------- */}
      {state === 0 && isWithConfig && (
        <CreateJobWithConfig
          onCancel={() => setIsWithConfig(false)}
          onConfirm={(job: JobResponse | undefined, step: string) => {
            setInitialStep(Number(step));
            initialJobInfo(job, Number(step));
          }}
        />
      )}
      {state > 0 && (
        <div>
          <Stepper state={state} changeState={setState} />
          {state < 6 && (
            <h1 className="font-light text-pep-orange text-xl">
              {steps[state - 1]}
            </h1>
          )}
          {/* ------------------- Context for each step ---------------------- */}

          <FormProvider {...form}>
            <form className="py-5 gap-5 min-w-fit min-h-fit">
              {state < 6 && (
                <div className="rounded-lg border border-pep-gray-border px-6 py-8 space-y-2">
                  {state === 1 && (
                    <ProteinQuery
                      isWithConfig={isWithConfig}
                      initialStep={initialStep}
                      state={state}
                      errors={errors}
                      pipeline={pipeline}
                      setPipeline={setPipeline}
                    />
                  )}
                  {state === 2 && (
                    <ProteinRepresentation
                      initialStep={initialStep}
                      state={state}
                      pipeline={pipeline}
                      setPipeline={setPipeline}
                    />
                  )}
                  {state === 3 && (
                    <UploadLabInput initialStep={initialStep} state={state} />
                  )}

                  {state === 4 && (
                    <TopModel
                      initialStep={initialStep}
                      state={state}
                      pipeline={pipeline}
                      setPipeline={setPipeline}
                    />
                  )}
                  {state === 5 && (
                    <Mutation
                      state={state}
                      pipeline={pipeline}
                      setPipeline={setPipeline}
                    />
                  )}
                </div>
              )}
              {state === 6 && (
                <Conclusion
                  initialStep={initialStep}
                  errors={errors}
                  pipeline={pipeline}
                  setPipeline={setPipeline}
                />
              )}

              {/* ------------------- Button for each step ---------------------- */}
              <div className="flex justify-between gap-2 py-5">
                <Button
                  type="button"
                  id="handleBack"
                  buttonType="cancel"
                  text="Cancel"
                  onClick={handleBack}
                />
                {state === 6 ? (
                  <Button
                    id="handleConfirm"
                    buttonType="submit"
                    type="button"
                    text="Confirm"
                    onClick={() => setConfirmVisible(true)}
                  />
                ) : (
                  <Button
                    type="button"
                    id="handleNext"
                    buttonType="next"
                    text="Next"
                    onClick={() => changeState(state + 1)}
                  />
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </div>
  );
}
