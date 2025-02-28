import { Order, State } from "./Job.interface";

export interface MutationHistogram {
  name: string;
  data: number[];
}

export interface Mutation {
  id: string;
  name: string;
  job_name: string;
  job_id: string;
  run_id: string;
  input_protein: string;
  options: string;
  tool: string;
  state: State;
  is_bookmark: boolean;
  user_id: string;
  histogram_data: number[];
  created_at: string;
  complete_at: string;
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

export interface MutationResultSearchParams {
  job_id?: string;
  is_selected?: boolean;
  organisms?: string;
  percent_identity_from?: number;
  percent_identity_to?: number;
  e_values_from?: number;
  e_values_to?: number;
  query_cover_from?: number;
  query_cover_to?: number;
  sort?: string;
  order?: Order;
}

export interface MutationResult {
  input_protein: string;
  job_id: string;
  result: Result[];
}

export interface MutationSearchParams {
  job_id?: string;
  name?: string;
  is_bookmark?: boolean;
  sort?: string;
  order?: Order;
}
