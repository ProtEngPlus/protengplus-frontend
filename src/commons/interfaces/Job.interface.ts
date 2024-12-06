export type LabResult = {
  total: number;
  sequences: string[];
  scores: number[];
};

export type OptionValue = string | string[] | number | number[];
export type RunType = "auto" | "one-step";

export interface Job {
  name: string;
  description: string;
  run_type: RunType;
  isNotificationOn: boolean;
  state: string;
  stage_id: number;
  lab_result: LabResult;
  options: Record<string, Record<string, OptionValue>>;
  artifact: Record<string, object> | null;
  meta: string[];
  input_protein: string;
}

export interface JobResponse extends Job {
  id: string;
}

export interface JobSearchParams {
  state?: string | string[];
  name?: string;
}
