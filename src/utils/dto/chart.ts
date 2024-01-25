import {StatisticDTO} from "../api/dtos/statistics";

export type ChartProps = {
    dataset: Dataset[],
    title: string;
}

export type Dataset = {
    label: string;
    data: StatisticDTO[];
    borderColor: string;
    backgroundColor: string | string[];
    parsing: {
        xAxisKey: string;
        yAxisKey: string;
    }
}