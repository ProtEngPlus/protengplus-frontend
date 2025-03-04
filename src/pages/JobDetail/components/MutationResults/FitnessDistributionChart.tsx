import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { MutationHistogram } from "../../../../commons/interfaces/Mutation.interface";

export default function FitnessDistributionChartData({
    chartLabels,
    chartSeries,
    isShowLegend = true,
}: {
    chartLabels: string[];
    chartSeries: MutationHistogram[];
    isShowLegend?: boolean;
}) {
    const style = document.createElement("style");
    style.innerHTML = `
        .apexcharts-xaxis-label {
        display: none;
        }
        .apexcharts-xaxis-label:nth-child(3n) {
        display: revert;
        }
    `;
    document.head.appendChild(style);

    const [series, setSeries] = useState<MutationHistogram[]>([]);

    const [options, setOptions] = useState<ApexOptions>({
        chart: {
            type: "bar",
            stacked: true,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        colors: ["#2578D3", "#76C280", "#F58634"],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 0,
            },
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            borderColor: '#F1F1F1',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,

                }
            },
            yaxis: {
                lines: {
                    show: true,
                }
            },
        },
        legend: {
            show: isShowLegend,
            position: "bottom",
            fontSize: "12px",
            fontWeight: 600,
            horizontalAlign: "left",
            markers: {
                size: 5,
                shape: "circle",
                strokeWidth: 1,
            },
        },
        fill: {
            opacity: 1,
        },
        yaxis: {
            axisBorder: {
                show: true,
            },
            title: {
                text: "Count",
            },
        },
    });

    useEffect(() => {
        setOptions((prevOptions: any) => ({
            ...prevOptions,
            xaxis: {
                type: "category",
                categories: chartLabels,
                stepSize: 0.5,
                axisTicks: {
                    show: false,
                },
                title: {
                    text: "Fitness",
                },
                offsetX: -15,
            },
        }));
        setSeries(chartSeries);
    }, [chartLabels, chartSeries]);

    return (
        <div className="p-4 border border-pep-light-gray rounded-md font-light">
            <div className="flex flex-col gap-2">
                <div className="text-pep-blue text-2xl font-medium">Result Characteristics</div>
                <div className="text-pep-dark-blue text-xl">Position Scan 25k</div>
                <div>Fitness distribution of 25k sequences from Position_scan step</div>
            </div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height={350}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}