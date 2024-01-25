import {ChartDataDTO, ChartDTO} from "./dtos/chart";

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
        } else {
            return await response.text();
        }
    };

    // check if access token expired
    // ...
    return await createChartFn(chart);
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

    // check if access token expired
    // ...
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

    // check if access token expired
    // ...
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
        } else {
            return await response.text();
        }
    };

    // check if access token expired
    // ...
    return await deleteChartFn(chartId);
};