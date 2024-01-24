export type Statistic = {
    id: number;
    subject: string;
    label: string;
    value: number;
    date: string;
    source: string;
    tags: string;
}

export type Dataset = {
    label: string;
    data: Statistic[];
    borderColor: string;
    backgroundColor: string;
    parsing: {
        xAxisKey: string;
        yAxisKey: string;
    }
}

export type ChartData = {
    title: string,
    dataset: Dataset[],
}