import {ChartDataDTO, ChartDTO} from "./dtos/chart";
import {keyIsValid} from "../functions";

export const createChart = async (chart: ChartDTO) => {
    const createChartFn = async (chart: ChartDTO) => {
        const response = await fetch(`${process.env.REACT_APP_CHARTS_API}`, {
            method: "POST",
            body: JSON.stringify(chart),
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    if (keyIsValid()) {
        return await createChartFn(chart);
    }
};


export const findAllCharts = async () => {
    const findAllChartsFn = async () => {
        const response = await fetch(`${process.env.REACT_APP_RESOURCES_API}/charts`);

        if (!response.ok) {
            throw await response.json();
        } else {
            return await response.json() as Promise<ChartDTO[]>;
        }
    };

    return await findAllChartsFn();
};

export const findAllChartData = async () => {
    const findAllChartDataFn = async () => {
        const response = await fetch(`${process.env.REACT_APP_RESOURCES_API}/charts/data`);

        if (!response.ok) {
            throw await response.json();
        } else {
            return await response.json() as Promise<ChartDataDTO[]>;
        }
    };

    return await findAllChartDataFn();
};

export const deleteChart = async (chartId: number) => {
    const deleteChartFn = async (chartId: number) => {
        const response = await fetch(`${process.env.REACT_APP_CHARTS_API}/${chartId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
            }
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    if (keyIsValid()) {
        return await deleteChartFn(chartId);
    }
};