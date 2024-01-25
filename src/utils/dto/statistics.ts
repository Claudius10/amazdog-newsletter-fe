export type Subject = {
    id: number | undefined;
    name: string;
}

export type Statistic = {
    id: number;
    subject: string;
    label: string;
    value: number;
    date: string;
    source: string;
    tags: string;
}
