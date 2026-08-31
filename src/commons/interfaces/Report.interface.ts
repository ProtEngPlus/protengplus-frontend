import { LabResult, OptionValue, RunType } from "./Job.interface";

export interface RunTime {
  start_time: string;
  end_time: string;
}

export interface ReportInterface {
  user_id: string;
  username: string;
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
  run_time?: Record<string, RunTime> | null;
  created_at?: Date | null;
}

export interface QueryResultInterface {
  acc_len: number;
  accession: string;
  description: string;
  e_values: number;
  hsp_query_from: number;
  hsp_query_to: number;
  id: string;
  is_selected: boolean;
  max_score: number;
  organisms: string;
  percent_identity: number;
  query_cover: number;
  score: number;
  sequences: string;
}
