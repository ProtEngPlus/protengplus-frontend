import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  labels: string[];
  series: number[];
  setIsDonutChart: (isDonutChart: boolean) => void;
}

export default function BarChart({ labels, series, setIsDonutChart }: Props) {
  const options: ApexOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: [""],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        borderRadiusApplication: "around",
        borderRadiusWhenStacked: "last",
        columnWidth: "90%",
        barHeight: "70%",
        distributed: false,
        hideZeroBarsWhenGrouped: false,
      },
    },
    labels: labels,
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontFamily: "Mitr",
      fontWeight: 300,
      horizontalAlign: "left",
      itemMargin: {
        horizontal: 12,
        vertical: 5,
      },
      markers: {
        shape: "circle",
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#2578D3", "#F58634", "#FFAED6", "#76C280", "#EF4444"],
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: (value) => `${value}`,
      },
      style: {
        fontSize: "12px",
        fontFamily: "Mitr",
      },
    },
  };
  const chartSeries = labels.map((label, index) => ({
    name: label,
    data: [series[index] ?? 0],
  }));

  return (
    <div className="bg-white rounded-md shadow-statistic pt-3 pb-4 min-w-fit">
      <Icon
        id="change-to-donut-chart"
        icon="mdi:chart-arc"
        className="text-label size-6 min-w-6 place-self-end mx-2 cursor-pointer"
        onClick={() => setIsDonutChart(true)}
      />
      <h1 className="text-label text-center text-lg text-nowrap p-3">
        Number of Jobs
      </h1>
      <div id="bar-chart">
        <Chart
          options={options}
          series={chartSeries}
          type="bar"
          height={250}
          width="100%"
        />
      </div>
    </div>
  );
}
