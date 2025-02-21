import Button from "../../../../commons/components/Button/Button";
import { useEffect, useMemo, useState } from "react";
import SelectInput, {
  Option,
} from "../../../../commons/components/Input/SelectInput";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { getAllConfigurationJobs } from "../../../../commons/api/job";
import { JobConfiguration } from "../../../../commons/interfaces/CreateJob.interface";

const createJobOptions: Option[] = [
  { label: "Step 1 - Protein Query", value: "1" },
  { label: "Step 2 - Protein Representation", value: "2" },
  { label: "Step 3 - Upload Lab Input", value: "3" },
  { label: "Step 2 - Top Model", value: "4" },
  { label: "Step 5 - Mutation", value: "5" },
];

type FormValues = {
  selectConfigJob: string;
  selectStep: string;
};

export default function CreateJobWithConfig({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: (configJob: JobConfiguration | undefined, step: string) => void;
}) {
  const form = useForm<FormValues>();
  const selectedJobId = useWatch({
    control: form.control,
    name: "selectConfigJob",
  });

  const [jobConfigs, setJobConfigs] = useState<JobConfiguration[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await getAllConfigurationJobs();
        if (data.data) {
          setJobConfigs(data.data);
        }
      } catch (err) {
        console.log("Failed to load configurations.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const configurationOptions = useMemo(() => {
    return jobConfigs.map((job) => ({
      label: job.name,
      value: job.id,
    }));
  }, [jobConfigs]);

  const selectedJob = useMemo(() => {
    return jobConfigs.find((job) => job.id === selectedJobId);
  }, [selectedJobId, jobConfigs]);

  return (
    <div className="h-full place-content-center">
      <FormProvider {...form}>
        <div className="w-full max-w-[665px] p-16 rounded-lg border border-pep-gray-border place-self-center space-y-16">
          <h1 className="text-pep-blue text-4xl leading-8 text-center text-nowrap">
            Create Job With Configuration
          </h1>
          <div className="space-y-3">
            <div className="grid grid-cols-[2fr,3fr] items-center gap-3 font-light">
              <label className="text-nowrap">Select Configuration:</label>
              {isLoading ? (
                <div>Loading configuration</div>
              ) : (
                <SelectInput
                  id="selectConfigJob"
                  options={configurationOptions}
                  additionalValidation={{ required: { value: true } }}
                />
              )}
              <label className="self-start text-nowrap">Description:</label>
              {selectedJob && (
                <label className="text-wrap">{selectedJob.description}</label>
              )}
            </div>
            <div className="shrink text-pep-dark-gray">
              <h1 className="my-3">Used Existing Model</h1>
              <label className="font-light">
                To expedite the process, you may choose the "Continue" step,
                which utilizes the existing training results, or you can restart
                the entire workflow by selecting step 1 - "Protein Query."
              </label>
            </div>
            <hr />
            <div className="grid grid-cols-[2fr,3fr] items-center gap-3 font-light ">
              <label className="text-nowrap">Continue at Step:</label>
              <SelectInput
                id="selectStep"
                defaultValue="3"
                options={createJobOptions}
                additionalValidation={{ required: { value: true } }}
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <Button
              id="btn-create-job"
              buttonType="cancel"
              text="Back"
              className=""
              onClick={onCancel}
            />
            <Button
              id="btn-create-config-job"
              buttonType="next"
              text="Next"
              className=""
              onClick={() =>
                onConfirm(selectedJob, form.getValues("selectStep"))
              }
            />
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
