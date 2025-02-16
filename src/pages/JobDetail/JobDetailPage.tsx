import { useEffect, useState } from "react";
import FitnessDistributionChartData from "./components/MutationResults/FitnessDistributionChart";
import { getMutation, getMutationHistogram } from "../../commons/api/mutation";
import { MutationHistogram } from "../../commons/interfaces/Mutation.interface";
import { useLocation } from "react-router-dom";

export default function JobDetailPage() {
  const jobId = useLocation().pathname.split("/").filter(Boolean).pop();
  const chartLabels = ["-2.0", "-1.9", "-1.8", "-1.7", "-1.6", "-1.5", "-1.4", "-1.3", "-1.2", "-1.1", "-1.0", "-0.9", "-0.8", "-0.7", "-0.6", "-0.5", "-0.4", "-0.3", "-0.2", "-0.1", "0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9"];
  const [chartSeries, setChartSeries] = useState<MutationHistogram[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      // Call the API to get FitnessDistributionChart data
      if (jobId) {
        const { data } = await getMutationHistogram(jobId);
        if (data) {
          setChartSeries(data);
        }
      }

      // When fetching data from a specific mutation, extract the data to show in the chart
      // if (jobId) { // It is actually mutationId
      //   const { data } = await getMutation(jobId);
      //   if (data) {
      //     const chartData: MutationHistogram[] = [{
      //       name: data.name,
      //       data: data.histogram_data
      //     }];
      //     setChartSeries(chartData);
      //   }
      // }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Job Detail Page</h1>
      <FitnessDistributionChartData chartLabels={chartLabels} chartSeries={chartSeries} />
    </div>
  );
}
