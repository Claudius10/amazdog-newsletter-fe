import {Statistic} from "../../types";

export type ChartDTO = {
    id: number;
    title: string;
    type: string;
    subjects: SubjectDTO[];
}

export type SubjectDTO = {
    id: number | undefined;
    name: string;
}

export type ChartData = {
    title: string;
    type: string;
    statisticList: Statistic[][];
}