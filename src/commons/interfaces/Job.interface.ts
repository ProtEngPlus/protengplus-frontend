export type RunType = "auto" | "one-step";

export type State = "Created" | "Pending" | "Ongoing" | "Failed" | "Completed";

export type InputMode = "uniprot_id" | "prot_seq";

export type LabResult = {
  total: number;
  sequences: string[];
  scores: number[];
};

export type OptionValue =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | undefined;

export interface JobInterface {
  ref_job_id?: string;
  user_id: string;
  stage_id: number;
  input_mode: InputMode;
  name: string;
  description: string;
  input_protein: string;
  run_type: RunType;
  is_notification_on: boolean;
  lab_result: LabResult;
  meta: string[];
  options: Record<string, Record<string, OptionValue>>;
  artifact: Record<string, object> | null;
}

export interface JobResponse extends JobInterface {
  id: string;
  state: State;
}

export interface JobSearchParams {
  state?: string | string[];
  name?: string;
}
