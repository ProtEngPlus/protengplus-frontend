import { useState } from "react";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";

const labels = ["Created", "Pending", "Ongoing", "Completed", "Failed"];

interface Props {
  series: number[];
}

export default function Bar({ series }: Props) {
  const [isDonutChart, setIsDonutchart] = useState(true);
  return (
    <div>
      {isDonutChart ? (
        <DonutChart
          labels={labels}
          series={series}
          setIsDonutChart={setIsDonutchart}
        />
      ) : (
        <BarChart
          labels={labels}
          series={series}
          setIsDonutChart={setIsDonutchart}
        />
      )}
    </div>
  );
}
