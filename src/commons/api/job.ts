import { del, get, post, put } from "./common";
import { BACKEND_BASE_URL } from "../configs/apiConfig";
import { JobInterface, JobSearchParams } from "../interfaces/Job.interface";
import { Params } from "../interfaces/ApiResponse.interface";
import {
  CreateJobInterface,
  JobConfiguration,
} from "../interfaces/CreateJob.interface";
import { Content } from "../interfaces/Dashboard.interface";

const JOB_PATH = BACKEND_BASE_URL + "/proteng-conductor/jobs";
const UNI_PROT_PATH = BACKEND_BASE_URL + "/proteng-conductor/uniProt";
const DASHBOARD_PATH = BACKEND_BASE_URL + "/proteng-conductor/jobs/dashboard";

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
  return await post(path, null, true);
};

export const getDashboardContent = async () => {
  return await get<Content>(DASHBOARD_PATH, true);
};
