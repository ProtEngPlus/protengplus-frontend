import { useNavigate } from "react-router-dom";
import { useAuth } from "../../commons/hooks/useAuth";
import { useState } from "react";
import {
  CreateJobDetail,
  JobOption,
  PipelineItem,
  stepsForCreateJob,
} from "../../commons/interfaces/CreateJob.interface";
import {
  defaultCreateJobDetail,
  defaultPipeline,
} from "../../commons/configs/createJobConfig";
import {
  generateInitialJob,
  generateInitialJobConfig,
} from "./services/CreateJobConfig";
import { JobInterface } from "../../commons/interfaces/Job.interface";
import { FormProvider, useForm } from "react-hook-form";
import CreateJobWithConfig from "./component/CreateJobOption/CreateJob";
import CreateJob from "./component/CreateJobOption/CreateJobWithConfig";
import Stepper from "../../commons/components/CreateJob/Stepper/Stepper";
import ProteinQuery from "./component/CreateJobForm/ProteinQuery/ProteinQuery";
import ProteinRepresentation from "./component/CreateJobForm/ProteinRepresentation/ProteinRepresentation";
import TopModel from "./component/CreateJobForm/TopModel/TopModel";
import Mutation from "./component/CreateJobForm/Mutation/Mutation";
import Button from "../../commons/components/Button/Button";
import Conclusion from "./component/CreateJobForm/Conclusion/Conclusion";
import UploadLabInput from "./component/CreateJobForm/UploadLabInput/UploadLabInput";
import {
  ConfirmOverlay,
  ConfirmOverlayProps,
} from "../../commons/components/ModalOverlay/ConfirmOverlay";
import {
  SuccessOverlay,
  SuccessOverlayProps,
} from "../../commons/components/ModalOverlay/SuccessOverlay";

export default function CreateJobPage() {
  const navigate = useNavigate();

  const [isWithConfig, setIsWithConfig] = useState(false);
  const [initialStep, setInitialStep] = useState(1);
  const [step, setStep] = useState(0);
  const [pipeline, setPipeline] = useState<PipelineItem[]>(defaultPipeline);
  const [jobDetail, setJobDetail] = useState<CreateJobDetail>(
    defaultCreateJobDetail
  );
  const [jobOption, setJobOption] = useState<JobOption>(generateInitialJob());

  const form = useForm({
    defaultValues: { file_name: "", ...jobDetail, ...jobOption },
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  // generate initial job
  const initialJobOption = (job?: JobInterface, stepConfig?: number) => {
    if (!isWithConfig) {
      setInitialStep(1);
      setJobOption(generateInitialJob());
      setPipeline(defaultPipeline);
      setInitialStep(1);
      setStep(1);
    } else if (job && stepConfig) {
      const data = generateInitialJobConfig(job);
      reset({
        ...data.initialJobDetail,
        ...data.initialJobOption,
        file_name: job.lab_result.total > 0 ? "recent_lab_result" : "",
      });

      setJobOption(data.initialJobOption);
      setJobDetail(data.initialJobDetail);
      setPipeline(data.pipelineItem);
      setInitialStep(stepConfig);
      setStep(stepConfig);
    }
  };

  // for change step
  const handleBack = () => {
    setStep(step - 1);
  };

  const changeStep = (nextStep: number) => {
    if (nextStep <= stepsForCreateJob.length) {
      setStep(nextStep);
    }
  };

  // click confirm at conclusion step
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const ConfirmProps: ConfirmOverlayProps = {
    id: "confirm-create-job",
    onClose: () => {
      setIsConfirmVisible(false);
    },
    onConfirm: async () => {
      setIsConfirmVisible(false);
      try {
        setIsSuccessVisible(true);
      } catch (error) {
        console.error(error);
      }
    },
    title: "Do you want to create this job?",
    message: "You can modify this setup later from the job detail page.",
  };

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const SuccessProps: SuccessOverlayProps = {
    id: "success-create-job",
    onClose: () => {
      setIsSuccessVisible(false);
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
      {/*------------------------------------------- Create Job Option --------------------------------------------*/}
      {step === 0 && !isWithConfig && (
        <CreateJob
          createJob={() => initialJobOption()}
          createJobWithConfig={() => setIsWithConfig(true)}
        />
      )}
      {step === 0 && isWithConfig && (
        <CreateJobWithConfig
          onCancel={() => setIsWithConfig(false)}
          onConfirm={(job: JobInterface | undefined, step: string) => {
            setInitialStep(Number(step));
            initialJobOption(job, Number(step));
          }}
        />
      )}
      {/*--------------------------------------------- Create Job Form -------------------------------------------*/}
      {step > 0 && (
        <div>
          <Stepper step={step} changeStep={setStep} />
          {step < 6 && (
            <h1 className="font-light text-pep-orange text-xl">
              {stepsForCreateJob[step - 1]}
            </h1>
          )}
          {/* ------------------- Context for each step ---------------------- */}

          <FormProvider {...form}>
            <form className="py-5 gap-5 min-w-fit min-h-fit">
              {step < 6 && (
                <div className="rounded-lg border border-pep-gray-border px-6 py-8 space-y-2">
                  {step === 1 && <ProteinQuery />}
                  {step === 2 && <ProteinRepresentation />}
                  {step === 3 && <UploadLabInput />}

                  {step === 4 && <TopModel />}
                  {step === 5 && <Mutation />}
                </div>
              )}
              {step === 6 && <Conclusion />}

              {/* ------------------- Button for each step ---------------------- */}
              <div className="flex justify-between gap-2 py-5">
                <Button
                  type="button"
                  id="handleBack"
                  buttonType="cancel"
                  text="Cancel"
                  onClick={handleBack}
                />
                {step === 6 ? (
                  <Button
                    id="handleConfirm"
                    buttonType="submit"
                    type="button"
                    text="Confirm"
                    onClick={() => setIsConfirmVisible(true)}
                  />
                ) : (
                  <Button
                    type="button"
                    id="handleNext"
                    buttonType="next"
                    text="Next"
                    onClick={() => changeStep(step + 1)}
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
