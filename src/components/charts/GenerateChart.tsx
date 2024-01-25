import BarChart from "./types/BarChart";
import LineChart from "./types/LineChart";
import DoughnutChart from "./types/DoughnutChart";
import {ChartDataDTO} from "../../utils/api/dtos/chart";
import {Dataset} from "../../utils/dto/chart";
import {getRandomInt} from "../../utils/functions";

const GenerateChart = (chart: ChartDataDTO) => {
    const dataset: Dataset[] = [];

    const colors: string[] = [
        "rgb(255,7,7)",
        "rgb(46,103,225)",
        "rgb(255,166,0)",
        "rgb(83,166,41)",
        "rgb(255,29,139)",
        "rgb(215,38,241)",
        "rgb(180,79,0)",
        "rgb(0,255,140)",
        "rgb(0,255,220)",
        "rgb(255,219,0)",
    ];

    const generateColor = (colorsInUse: string[], datasetLength: number) => {
        while (colorsInUse.length < datasetLength) {
            let aRandomColor = colors[getRandomInt(0, 9)];
            if (!colorsInUse.includes(aRandomColor)) {
                colorsInUse.push(aRandomColor);
            }
        }
    };

    let chartToGenerate;
    switch (chart.type) {
        case "Bar":
            const colorsInUse: string[] = [];

            chart.statisticList.forEach(() => {
                generateColor(colorsInUse, chart.statisticList.length);
            });

            chart.statisticList.forEach((statisticList, index) => {
                dataset.push({
                    label: statisticList[0].label,
                    data: statisticList,
                    borderColor: 'rgb(255,255,255)',
                    backgroundColor: colorsInUse[index],
                    parsing: {
                        xAxisKey: 'date',
                        yAxisKey: 'value',
                    }
                });
            });

            chartToGenerate = <BarChart dataset={dataset} title={chart.title}/>;
            break;

        case "Line":
            const lineColors: string[] = [];
            const pointColors: string[] = [];

            chart.statisticList.forEach(() => {
                generateColor(lineColors, chart.statisticList.length);
                generateColor(pointColors, chart.statisticList.length);
            });

            chart.statisticList.forEach((statisticList, index) => {
                dataset.push({
                    label: statisticList[0].label,
                    data: statisticList,
                    borderColor: lineColors[index],
                    backgroundColor: pointColors[index],
                    parsing: {
                        xAxisKey: 'date',
                        yAxisKey: 'value',
                    }
                });
            });

            chartToGenerate = <LineChart dataset={dataset} title={chart.title}/>;
            break;
        case "Doughnut":
            const colorsToUse: string[] = [];

            chart.statisticList.forEach(() => {
                generateColor(colorsToUse, chart.statisticList[0].length);
            });

            chart.statisticList.forEach((statisticList) => {
                dataset.push({
                    label: statisticList[0].label,
                    data: statisticList,
                    borderColor: 'rgb(0,0,0)',
                    backgroundColor: colorsToUse,
                    parsing: {
                        xAxisKey: 'date',
                        yAxisKey: 'value',
                    }
                });
            });

            chartToGenerate = <DoughnutChart dataset={dataset} title={chart.title}/>;
            break;
    }

    return chartToGenerate;
};

export default GenerateChart;