import Button from "../../../../commons/components/Button/Button";
import { JobResponse } from "../../../../commons/interfaces/Job.interface";
import { useEffect, useMemo, useState } from "react";
import SelectInput from "../../../../commons/components/Input/SelectInput";
import { FormProvider, useForm, useWatch } from "react-hook-form";

const mockData: JobResponse[] = [
  {
    id: "672850f8f90bb0327c9dc7d4",
    state: "Completed",
    name: "New Job",
    stage_id: 0,
    user_id: "65d100cf306894794f89017f",
    lab_result: {
      total: 24,
      sequences: [
        "ASIQHFHW",
        "CSIQHFHW",
        "DSIQHFHW",
        "ESIQHFHW",
        "FSIQHFHW",
        "GSIQHFHW",
        "HSIQHFHW",
        "ISIQHFHW",
        "JSIQHFHW",
        "KSIQHFHW",
        "LSIQHFHW",
        "MSIQHFHW",
        "NSIQHFHW",
        "OSIQHFHW",
        "PSIQHFHW",
        "QSIQHFHW",
        "RSIQHFHW",
        "SSIQHFHW",
        "TSIQHFHW",
        "USIQHFHW",
        "VSIQHFHW",
        "WSIQHFHW",
        "XSIQHFHW",
        "YSIQHFHW",
      ],
      scores: [
        0.0029140000697225332, 0.003019999945536256, 0.0022189998999238014,
        0.004379000049084425, 0.0029140000697225332, 0.003019999945536256,
        0.0022189998999238014, 0.004379000049084425, 0.0029140000697225332,
        0.003019999945536256, 0.0022189998999238014, 0.004379000049084425,
        0.0029140000697225332, 0.003019999945536256, 0.0022189998999238014,
        0.004379000049084425, 0.0029140000697225332, 0.003019999945536256,
        0.0022189998999238014, 0.004379000049084425, 0.0029140000697225332,
        0.003019999945536256, 0.0022189998999238014, 0.004379000049084425,
      ],
    },
    options: {
      blast: {
        program: "blastp",
        hitlist_size: 50,
        database: "nr",
        expect: 10,
        perc_ident: 100,
        random_state: 50,
        seq_length: 70,
        hsp_cov: 0,
      },
      unirep: {
        n_trials: 2,
        n_splits: 2,
        n_epochs_config_low: 1,
        n_epochs_config_high: 11,
        learning_rate_config_low: 0.00001,
        learning_rate_config_high: 0.0001,
      },
      ridgecv: {
        train_batch_sizes: [24, 64, 96],
        n_batch: 12,
        alpha: 0.1,
      },
      mutation: {
        temperature: 0.01,
        num_iterations: 25,
        num_trajectories: 5,
        mutate_pos_range: 8,
      },
    },
    meta: ["blast", "unirep", "ridgecv", "mutation"],
    artifact: null,
    input_protein: "MLDDYDQS",
    input_mode: "uniprot_id",
    run_type: "auto",
    description: "this is a job",
    is_notification_on: true,
  },
  {
    id: "672850f8f90bb0327c9dc7d5",
    state: "Completed",
    name: "New Job#2",
    stage_id: 0,
    user_id: "65d100cf306894794f89016f",
    lab_result: {
      total: 24,
      sequences: [
        "ASIQHFHW",
        "CSIQHFHW",
        "DSIQHFHW",
        "ESIQHFHW",
        "FSIQHFHW",
        "GSIQHFHW",
        "HSIQHFHW",
        "ISIQHFHW",
        "JSIQHFHW",
        "KSIQHFHW",
        "LSIQHFHW",
        "MSIQHFHW",
        "NSIQHFHW",
        "OSIQHFHW",
        "PSIQHFHW",
        "QSIQHFHW",
        "RSIQHFHW",
        "SSIQHFHW",
        "TSIQHFHW",
        "USIQHFHW",
        "VSIQHFHW",
        "WSIQHFHW",
        "XSIQHFHW",
        "YSIQHFHW",
      ],
      scores: [
        0.0029140000697225332, 0.003019999945536256, 0.0022189998999238014,
        0.004379000049084425, 0.0029140000697225332, 0.003019999945536256,
        0.0022189998999238014, 0.004379000049084425, 0.0029140000697225332,
        0.003019999945536256, 0.0022189998999238014, 0.004379000049084425,
        0.0029140000697225332, 0.003019999945536256, 0.0022189998999238014,
        0.004379000049084425, 0.0029140000697225332, 0.003019999945536256,
        0.0022189998999238014, 0.004379000049084425, 0.0029140000697225332,
        0.003019999945536256, 0.0022189998999238014, 0.004379000049084425,
      ],
    },
    options: {
      blast: {
        program: "blastp",
        hitlist_size: 50,
        database: "nr",
        expect: 10,
        perc_ident: 100,
        random_state: 50,
        seq_length: 70,
        hsp_cov: 0,
      },
      unirep: {
        n_trials: 2,
        n_splits: 2,
        n_epochs_config_low: 1,
        n_epochs_config_high: 11,
        learning_rate_config_low: 0.00001,
        learning_rate_config_high: 0.0001,
      },
      ridgecv: {
        train_batch_sizes: [24, 64, 96],
        n_batch: 12,
        alpha: 0.1,
      },
      mutation: {
        temperature: 0.01,
        num_iterations: 25,
        num_trajectories: 5,
        mutate_pos_range: 8,
      },
    },
    meta: ["blast", "unirep", "ridgecv", "mutation"],
    artifact: null,
    input_protein: "MLDDYDQS",
    input_mode: "uniprot_id",
    run_type: "auto",
    description: "this is a job#2",
    is_notification_on: true,
  },
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
  onConfirm: (configJob: JobResponse | undefined, step: string) => void;
}) {
  const form = useForm<FormValues>();
  const selectedJobId = useWatch({
    control: form.control,
    name: "selectConfigJob",
  });

  const [configJobs, setConfigJobs] = useState<JobResponse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = mockData;
        setConfigJobs(data);
      } catch (err) {
        console.log("Failed to load configurations.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const configurationOptions = useMemo(() => {
    return configJobs.map((job) => ({
      label: job.name,
      value: job.id,
    }));
  }, [configJobs]);

  const selectedJob = useMemo(() => {
    return configJobs.find((job) => job.id === selectedJobId);
  }, [selectedJobId, configJobs]);

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
                options={[
                  { label: "Step 1 - Protein Query", value: "1" },
                  { label: "Step 2 - Protein Representation", value: "2" },
                  { label: "Step 3 - Upload Lab Input", value: "3" },
                  { label: "Step 2 - Top Model", value: "4" },
                  { label: "Step 5 - Mutation", value: "5" },
                ]}
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

// const mockData: JobResponse[] = [
//   {
//     id: "65afd741c4748e4e0579e155",
//     name: "configuration #1",
//     meta: ["Blast", "Unirep", "Ridgecv", "MCMC"],
//     options: {
//       Blast: {
//         database: "nr",
//         expect: 100,
//         hitlist_size: 50,
//         perc_ident: 0,
//         program: "blastp",
//         random_state: 2023,
//       },
//       MCMC: {
//         temperature: 0.01,
//         num_iterations: 25,
//         num_trajectories: 5,
//       },
//       Ridgecv: {
//         alpha: 20,
//         n_batch: 20,
//         train_batch_sizes: [24, 64, 96],
//       },
//       Unirep: {
//         learning_rate_config: {
//           high: 0.001,
//           low: 0.00001,
//         },
//         n_epochs_config: {
//           high: 1,
//         },
//         n_splits: 2,
//         n_trials: 2,
//       },
//     },
//     input_protein: "MLRLVDDYDQS",
//     lab_result: {
//       total: 0,
//       sequences: [],
//       scores: [],
//     },
//     artifact: null,
//     run_type: "auto",
//     description: "New Configuration for mutation protein1",
//     isNotificationOn: true,
//   },
//   {
//     id: "65afd741c4748e4e0579e107",
//     name: "configuration #2",
//     meta: ["Blast", "Unirep", "Ridgecv", "MCMC"],
//     options: {
//       Blast: {
//         database: "nr",
//         expect: 10,
//         hitlist_size: 50,
//         perc_ident: 0,
//         program: "blastp",
//         random_state: 2023,
//       },
//       MCMC: {
//         temperature: 0.01,
//         num_iterations: 25,
//         num_trajectories: 5,
//       },
//       Ridgecv: {
//         alpha: 20,
//         n_batch: 20,
//         // train_batch_sizes: [24, 64, 96],
//       },
//       Unirep: {
//         learning_rate_config: {
//           high: 0.001,
//           low: 0.00001,
//         },
//         n_epochs_config: {
//           high: 1,
//         },
//         n_splits: 2,
//         n_trials: 2,
//       },
//     },
//     input_protein: "MLRLVDDYDQS",
//     lab_result: {
//       total: 0,
//       sequences: [],
//       scores: [],
//     },
//     artifact: null,
//     run_type: "auto",
//     description: "New Configuration for mutation2",
//     isNotificationOn: true,
//   },
// ];

// type FormValues = {
//   selectConfigJob: string;
//   selectStep: string;
// };

// export default function CreateJobWithConfig({
//   onCancel,
//   onConfirm,
// }: {
//   onCancel: () => void;
//   onConfirm: (configJob: JobResponse | undefined, step: string) => void;
// }) {
//   const form = useForm<FormValues>();
//   const selectedJobId = useWatch({
//     control: form.control,
//     name: "selectConfigJob",
//   });

//   const [configJobs, setConfigJobs] = useState<JobResponse[]>([]);
//   const [isLoading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoading(true);
//       try {
//         const data = mockData;
//         setConfigJobs(data);
//       } catch (err) {
//         console.log("Failed to load configurations.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   const configurationOptions = useMemo(() => {
//     return configJobs.map((job) => ({
//       label: job.name,
//       value: job.id,
//     }));
//   }, [configJobs]);

//   const selectedJob = useMemo(() => {
//     return configJobs.find((job) => job.id === selectedJobId);
//   }, [selectedJobId, configJobs]);

//   return (
//     <div className="h-full place-content-center">
//       <FormProvider {...form}>
//         <div className="w-full max-w-[665px] p-16 rounded-lg border border-pep-gray-border place-self-center space-y-16">
//           <h1 className="text-pep-blue text-4xl leading-8 text-center text-nowrap">
//             Create Job With Configuration
//           </h1>
//           <div className="space-y-3">
//             <div className="grid grid-cols-[2fr,3fr] items-center gap-3 font-light">
//               <label className="text-nowrap">Select Configuration:</label>
//               {isLoading ? (
//                 <div>Loading configuration</div>
//               ) : (
//                 <SelectInput
//                   id="selectConfigJob"
//                   className=""
//                   options={configurationOptions}
//                   additionalValidation={{ required: { value: true } }}
//                 />
//               )}
//               <label className="self-start text-nowrap">Description:</label>
//               {selectedJob && (
//                 <label className="text-wrap">{selectedJob.description}</label>
//               )}
//             </div>
//             <div className="shrink text-pep-dark-gray">
//               <h1 className="my-3">Used Existing Model</h1>
//               <label className="font-light">
//                 To expedite the process, you may choose the "Continue" step,
//                 which utilizes the existing training results, or you can restart
//                 the entire workflow by selecting step 1 - "Protein Query."
//               </label>
//             </div>
//             <hr />
//             <div className="grid grid-cols-[2fr,3fr] items-center gap-3 font-light ">
//               <label className="text-nowrap">Continue at Step:</label>
//               <SelectInput
//                 id="selectStep"
//                 defaultValue="3"
//                 options={[
//                   { label: "Step 1 - Protein Query", value: "1" },
//                   { label: "Step 3 - Upload Lab Input", value: "3" },
//                 ]}
//                 additionalValidation={{ required: { value: true } }}
//               />
//             </div>
//           </div>
//           <div className="flex justify-between gap-2">
//             <Button
//               id="btn-create-job"
//               buttonType="cancel"
//               text="Back"
//               className=""
//               onClick={onCancel}
//             />
//             <Button
//               id="btn-create-config-job"
//               buttonType="next"
//               text="Next"
//               className=""
//               onClick={() =>
//                 onConfirm(selectedJob, form.getValues("selectStep"))
//               }
//             />
//           </div>
//         </div>
//       </FormProvider>
//     </div>
//   );
// }
