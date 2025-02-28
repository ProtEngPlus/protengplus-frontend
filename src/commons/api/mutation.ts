import { get } from "./common";
import { BACKEND_BASE_URL } from "../configs/apiConfig";

import { Params } from "../interfaces/ApiResponse.interface";
import {
  Mutation,
  MutationHistogram,
  MutationResult,
  MutationSearchParams,
} from "../interfaces/Mutation.interface";

/*------------------------- job detail section -------------------------------------*/

export const getMutationHistogram = async (jobId: string) => {
  const path =
    BACKEND_BASE_URL +
    "/proteng-conductor/mutations/histograms?job_id=" +
    jobId;
  return await get<MutationHistogram[]>(path, true);
};

/*------------------------- mutation detail section -------------------------------------*/

export const getMutation = async (mutationId: string) => {
  const path = BACKEND_BASE_URL + "/proteng-conductor/mutations/" + mutationId;
  return await get<Mutation>(path, true);
};

export const getAllMutations = async (params: MutationSearchParams) => {
  const path = BACKEND_BASE_URL + "/proteng-conductor/mutations";
  return await get<Mutation[]>(path, true, params as Params);
};

export const getAllMutationResult = async (params: MutationSearchParams) => {
  const path = BACKEND_BASE_URL + "/proteng-conductor/query_results";
  return await get<MutationResult>(path, true, params as Params);
};
