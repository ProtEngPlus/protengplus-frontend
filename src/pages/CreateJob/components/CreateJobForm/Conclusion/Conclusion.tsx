import { Icon } from "@iconify/react";
import Button from "../../../../../commons/components/Button/Button";
import ProteinQuery from "../ProteinQuery/ProteinQuery";
import ProteinRepresentation from "../ProteinRepresentation/ProteinRepresentation";
import UploadLabInput from "../UploadLabInput/UploadLabInput";
import TopModel from "../TopModel/TopModel";
import Mutation from "../Mutation/Mutation";
import { PipelineItem } from "../../../../../commons/interfaces/CreateJob.interface";
import { useFormContext } from "react-hook-form";
interface Props {
  initialStep: number;
  errors: any;
  pipeline: PipelineItem[];
  setPipeline: (p: PipelineItem[]) => void;
}

export default function Conclusion({
  initialStep,
  errors,
  pipeline,
  setPipeline,
}: Props) {
  const { watch, setValue } = useFormContext();
  const is_notification_on = watch("is_notification_on");
  const run_type = watch("run_type");

  return (
    <div className="space-y-5">
      {/* for setting notification, run_type */}
      <div className="flex flex-row justify-between space-x-6">
        <h1 className="font-light text-pep-orange text-xl">Conclusion</h1>
        <div className="flex space-x-6 items-center">
          <Icon
            icon={
              is_notification_on
                ? "carbon:notification-filled"
                : "carbon:notification-off-filled"
            }
            className={` cursor-pointer size-[30px] ${
              is_notification_on ? "text-pep-orange" : "text-error"
            }`}
            onClick={() => setValue("is_notification_on", !is_notification_on)}
          />
          <div className="space-x-2">
            <Button
              id="auto-run"
              type="button"
              buttonType={run_type === "auto" ? "next" : "cancel"}
              text="Auto Run"
              className="inline-flex items-center whitespace-nowrap place-content-center text-center gap-2"
              onClick={() => setValue("run_type", "auto")}
            >
              <Icon
                icon="fa-solid:running"
                className={`w-[20px] h-[25px] ${
                  run_type === "auto" ? "text-white" : "text-pep-gray"
                }`}
              />
            </Button>
            <Button
              id="one-step-run"
              type="button"
              buttonType={run_type === "one-step" ? "next" : "cancel"}
              text="One-Step Run"
              className="inline-flex items-center whitespace-nowrap place-content-center text-center gap-2"
              onClick={() => setValue("run_type", "one-step")}
            >
              <Icon
                icon="ic:baseline-checklist-rtl"
                className={`size-[20px] ${
                  run_type === "one-step" ? "text-white" : "text-pep-gray"
                }`}
              />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span>Download PDF</span>
            <div className="bg-pep-orange rounded-full p-[5px] cursor-pointer">
              <Icon
                icon="heroicons-outline:download"
                className="text-white size-[30px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* All steps */}
      <div className="rounded-lg border border-pep-gray-border px-6 py-8 space-y-11">
        <ProteinQuery
          state={1}
          initialStep={initialStep}
          errors={errors}
          pipeline={pipeline}
          setPipeline={setPipeline}
          isConclusion={true}
          onEditInfo={false}
          onEditProt={false}
        />

        <ProteinRepresentation
          state={2}
          initialStep={initialStep}
          pipeline={pipeline}
          setPipeline={setPipeline}
          isConclusion={true}
          onEdit={false}
        />

        <UploadLabInput
          state={3}
          initialStep={initialStep}
          isConclusion={true}
          onEdit={false}
        />

        <TopModel
          state={4}
          initialStep={initialStep}
          pipeline={pipeline}
          setPipeline={setPipeline}
          isConclusion={true}
          onEdit={false}
        />

        <Mutation
          state={5}
          pipeline={pipeline}
          setPipeline={setPipeline}
          isConclusion={true}
          onEdit={false}
        />
      </div>
    </div>
  );
}
