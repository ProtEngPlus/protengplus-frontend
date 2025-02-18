import { get, post, put, del } from "./common";
import { BACKEND_BASE_URL } from "../configs/apiConfig";
import { JobInterface, JobSearchParams } from "../interfaces/Job.interface";
import { Params } from "../interfaces/ApiResponse.interface";
import {
  CreateJobInterface,
  JobConfiguration,
} from "../interfaces/CreateJob.interface";

const JOB_PATH = BACKEND_BASE_URL + "/proteng-conductor/jobs";
export const getAllJobs = async (params: JobSearchParams) => {
  const path = JOB_PATH;
  return await get<JobInterface[]>(path, true, params as Params);
};

export const getJob = async (id: string) => {
  const path = JOB_PATH + `/${id}`;
  return await get<JobInterface>(path, true);
};

export const createJob = async (job: CreateJobInterface) => {
  const path = JOB_PATH;
  return await post<CreateJobInterface>(path, job, true);
};

export const getAllConfigurationJobs = async () => {
  const path = JOB_PATH + "/configurations";
  return await get<JobConfiguration[]>(path, true);
};

export const getUniProtId = async (uniProtId: string) => {
  const path = BACKEND_BASE_URL + `/proteng-conductor/uniProt/${uniProtId}`;
  return await get<string>(path, true);
};
