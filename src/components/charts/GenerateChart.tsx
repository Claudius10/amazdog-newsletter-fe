import {ChartData} from "../../utils/api/dtos/chart";
import {Dataset} from "../../utils/types";
import {Chart} from "./Charts";

const GenerateChart = (data: ChartData) => {
    console.log("Data");
    console.log(data);
    const dataset: Dataset[] = [];

    function random_rgba() {
        const o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
    }

    data.statisticList.forEach((statisticList) => {
        dataset.push({
            label: statisticList[0].label,
            data: statisticList,
            borderColor: 'rgb(34,184,210)',
            backgroundColor: random_rgba(),
            parsing: {
                xAxisKey: 'date',
                yAxisKey: 'value',
            }
        });
    });

    return <Chart type={data.type} dataset={dataset} title={data.title} source={""}/>;
};

export default GenerateChart;