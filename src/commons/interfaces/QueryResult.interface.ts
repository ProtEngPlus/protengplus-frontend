import { Order } from "./Job.interface";

export interface QueryResult {
  input_protein: string;
  job_id: string;
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
  percent_identity_from?: number;
  percent_identity_to?: number;
  e_values_from?: number;
  e_values_to?: number;
  query_cover_from?: number;
  query_cover_to?: number;
  sort?: string;
  order?: Order;
}
