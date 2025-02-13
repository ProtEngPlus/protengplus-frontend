export type RunType = "auto" | "one-step";

export type State = "CREATED" | "PENDING" | "ONGOING" | "FAILED" | "COMPLETED";

export const Steps = [
  "Protein Query",
  "Protein Representation",
  "Top Model",
  "Mutation",
];

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
  id: string;
  user_id: string;
  stage_id: number;
  state: State;
  ref_job_id?: string;
  name: string;
  description: string;
  input_protein: string;
  meta: string[];
  lab_result: LabResult;
  options: Record<string, Record<string, OptionValue>>;
  is_notification_on: boolean;
  run_type: RunType;
  artifact: Record<string, object> | null;
  error_logs: string[];
  created_at: string;
  complete_at?: string;
}

export interface JobSearchParams {
  name?: string;
  state?: string | string[];
  sort?: string;
  order?: string;
}
