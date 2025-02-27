import { get, post } from "./common";
import { BACKEND_BASE_URL } from "../configs/apiConfig";
import { JobInterface, JobSearchParams } from "../interfaces/Job.interface";
import { Params } from "../interfaces/ApiResponse.interface";
import {
  CreateJobConfiguration,
  CreateJobInterface,
  JobConfiguration,
} from "../interfaces/CreateJob.interface";

const JOB_PATH = BACKEND_BASE_URL + "/proteng-conductor/jobs";
const UNI_PROT_PATH = BACKEND_BASE_URL + "/proteng-conductor/uniProt";
const JOB_CONFIG_PATH =
  BACKEND_BASE_URL + "/proteng-conductor/jobs/configurations";

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
  const path = UNI_PROT_PATH + `/${uniProtId}`;
  return await get<string>(path, true);
};

export const updateJobDetail = async (
  id: string,
  updateData: Partial<JobInterface>
) => {
  const path = JOB_PATH + `/${id}`;
  return await put<JobInterface>(path, updateData, true);
};

export const deleteJob = async (id: string) => {
  const path = JOB_PATH + `/${id}`;
  return await del(path, true);
};

export const runJob = async (id: string) => {
  const path = JOB_PATH + `/${id}/run`;
  return await post(path, true);
};

export const createJobConfiguration = async (job: CreateJobConfiguration) => {
  return await post<CreateJobConfiguration>(JOB_CONFIG_PATH, job, true);
};
