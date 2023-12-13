export type Statistic = {
    id: number;
    subject: string;
    value: number;
    date: string;
    source: string
    tags: string
}

export type Dataset = {
    label: string;
    data: any;
    borderColor: string;
    backgroundColor: string;
    parsing: {
        xAxisKey: string;
        yAxisKey: string;
    }
}