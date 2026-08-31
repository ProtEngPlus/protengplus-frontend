import {
  getAllQueryResults,
  getReportQueryResults,
} from "../../../commons/api/queryResult";
import { QueryResultSearchParams } from "../../../commons/interfaces/QueryResult.interface";
import { FieldValues } from "react-hook-form";

export async function DownloadQueryResult(
  formData: FieldValues,
  job_id: string,
) {
  try {
    const params: QueryResultSearchParams = { job_id };
    const today = new Date().toISOString().split("T")[0];

    const response = await getAllQueryResults(params);

    if (response.data) {
      const queryResultResponse = await getReportQueryResults(job_id); // CSV blob
      const csvBlob = new Blob([queryResultResponse], { type: "text/csv" });
      const url = URL.createObjectURL(csvBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `QueryResult_${formData["name"]}_${today}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error(error);
  }
}
