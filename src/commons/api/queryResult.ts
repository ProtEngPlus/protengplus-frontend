import { get, put } from "./common";
import { BACKEND_BASE_URL } from "../configs/apiConfig";
import { Params } from "../interfaces/ApiResponse.interface";
import {
  QueryResult,
  QueryResultSearchParams,
} from "../interfaces/QueryResult.interface";

const QUERY_RESULT_PATH = BACKEND_BASE_URL + "/proteng-conductor/query_results";

export const getAllQueryResults = async (params: QueryResultSearchParams) => {
  return await get<QueryResult>(QUERY_RESULT_PATH, true, params as Params);
};

export const updateQueryResult = async (id: string, data: QueryResult) => {
  const path = QUERY_RESULT_PATH + `/${id}`;
  return await put<QueryResult>(path, data, true);
};
