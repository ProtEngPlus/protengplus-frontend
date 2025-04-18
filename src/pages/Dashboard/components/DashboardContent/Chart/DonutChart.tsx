import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  labels: string[];
  series: number[];
  setIsDonutChart: (isDonutChart: boolean) => void;
}

export default function DonutChart({ labels, series, setIsDonutChart }: Props) {
  const options: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Mitr",
      height: 144,
      width: 144,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "85%",

          labels: {
            show: true,

            name: {
              offsetY: 20,
              show: true,
              color: "#6B7280",
              fontFamily: "Mitr",
              fontSize: "14px",
            },
            value: {
              offsetY: -20,
              color: "#000000",
              fontFamily: "Mitr",
              fontSize: "22px",
              show: true,
            },

            total: {
              show: true,
              label: "Jobs",
              color: "#6B7280",
              fontFamily: "Mitr",
              fontSize: "14px",
              fontWeight: 300,
            },
          },
        },
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

  return (
    <div className="bg-white rounded-md shadow-statistic pt-3 pb-4 min-w-fit">
      <Icon
        icon="solar:chart-bold"
        className="text-label size-6 min-w-6 place-self-end mx-2 cursor-pointer"
        onClick={() => setIsDonutChart(false)}
      />
      <h1 className="text-label text-center text-lg text-nowrap p-3">
        Number of Jobs
      </h1>
      {/* Donut chart */}
      <Chart
        options={options}
        series={series}
        type="donut"
        width="100%"
        height={250}
      />
    </div>
  );
}
