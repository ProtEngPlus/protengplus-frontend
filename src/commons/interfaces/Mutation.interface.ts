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
  mutation_id?: string;
  job_id?: string;
  is_bookmark?: boolean;
  sort?: string;
  min_value?: boolean;
  max_value?: boolean;
}

export interface MutationResult {
  assay_score: number;
  id: string;
  is_bookmark: boolean;
  mutation_id: string;
  mutation_positions: null;
  protein_sequence: string;
  user_id: string;
  job_id: string;
}

export interface MutationSearchParams {
  job_id?: string;
  name?: string;
  is_bookmark?: boolean;
  sort?: string;
  order?: Order;
}
