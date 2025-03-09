import { del, get, getRaw, post, put } from "./common";
import { BACKEND_BASE_URL } from "../configs/apiConfig";
import { CreateMutationInterface, MutationInterface, MutationHistogram, MutationSearchParams, MutationResultInterface, MutationResultSearchParams } from "../interfaces/Mutation.interface";
import { Params } from "../interfaces/ApiResponse.interface";

const MUTATION_PATH = BACKEND_BASE_URL + "/proteng-conductor/mutations";
const MUTATION_RESULT_PATH = BACKEND_BASE_URL + "/proteng-conductor/mutations/results";

/*------------------------- job detail section -------------------------------------*/

export const getMutationHistogram = async (jobId: string) => {
    const path = MUTATION_PATH + `/histograms?job_id=${jobId}`;
    return await get<MutationHistogram[]>(path, true);
};

export const createMutation = async (mutation: CreateMutationInterface) => {
    const path = MUTATION_PATH;
    return await post<CreateMutationInterface>(path, mutation, true);
};

export const getAllMutations = async (params: MutationSearchParams) => {
    const path = MUTATION_PATH;
    return await get<MutationInterface[]>(path, true, params as Params);
}

export const deleteMutation = async (mutationId: string) => {
    const path = MUTATION_PATH + `/${mutationId}`;
    return await del(path, true);
}

export const runMutation = async (mutationId: string) => {
    const path = MUTATION_PATH + `/${mutationId}/run`;
    return await post(path, {}, true);
}

export const updateMutationDetail = async (mutationId: string, updateData: Partial<MutationInterface>) => {
    const path = MUTATION_PATH + `/${mutationId}`;
    return await put<MutationInterface>(path, updateData, true);
}

/*------------------------- mutation detail section -------------------------------------*/

export const getAllMutationResults = async (params: MutationResultSearchParams) => {
    const path = MUTATION_RESULT_PATH;
    return await get<MutationResultInterface[]>(path, true, params as Params);
}

export const updateMutationResultDetail = async (mutationResultId: string, updateData: Partial<MutationResultInterface>) => {
    const path = MUTATION_RESULT_PATH + `/${mutationResultId}`;
    return await put<MutationResultInterface>(path, updateData, true);
}

export const downloadMutationResults = async (mutationId: string) => {
    const path = MUTATION_PATH + `/${mutationId}/download`;
    return await getRaw(path, true);
}