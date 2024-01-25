import {Subject} from "../../dto/statistics";
import {StatisticDTO} from "./statistics";

export type ChartDTO = {
    id: number;
    title: string;
    type: string;
    subjects: Subject[];
}

export type ChartDataDTO = {
    title: string;
    type: string;
    statisticList: StatisticDTO[][];
}