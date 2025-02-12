import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../../commons/components/Button/Button";

export default function CreateJob({
  createJob,
  createJobWithConfig,
}: {
  createJob: () => void;
  createJobWithConfig: () => void;
}) {
  return (
    <div className="h-full place-content-center">
      <div className="p-16 rounded-lg border border-pep-gray-border place-self-center space-y-16">
        <h1 className="text-pep-blue text-4xl leading-8 text-center">
          Create Job
        </h1>
        <div className="flex flex-col w-fit space-y-9 place-content-center place-items-center">
          <Button
            id="btn-create-job"
            buttonType="submit"
            text="Create New Job"
            className="min-w-fit w-full !font-light text-2xl inline-flex items-center whitespace-nowrap place-content-center text-center gap-2"
            onClick={createJob}
          >
            <Icon icon="basil:add-outline" className="size-6" />
          </Button>
          <Button
            id="btn-create-config-job"
            buttonType="submit"
            text="Create Job With Configuration"
            className="w-fit !font-light text-2xl inline-flex items-center whitespace-nowrap place-content-center text-center gap-2"
            onClick={createJobWithConfig}
          >
            <Icon icon="basil:add-outline" className="size-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
