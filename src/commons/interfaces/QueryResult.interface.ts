import { Order, State } from "./Job.interface";

export interface QueryResult {
  complete_at: string;
  created_at: string;
  id: string;
  job_id: string;
  input_protein: string;
  run_id: number;
  state: State;
  result: Result[];
}

export interface Result {
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

export interface QueryResultSearchParams {
  job_id?: string;
  is_selected?: boolean;
  organisms?: string;
  percentIdentityFrom?: number;
  percentIdentityTo?: number;
  eValuesFrom?: number;
  eValuesTo?: number;
  queryCoverFrom?: number;
  queryCoverTo?: number;
  sort?: string;
  order?: Order;
}
