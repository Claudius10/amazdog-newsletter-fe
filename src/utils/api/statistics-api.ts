import {Statistic} from "../types";
import {QueryOptions} from "@tanstack/react-query";

export const createStatistic = async (statistic: Statistic) => {
    const createStatisticFn = async (statistic: Statistic) => {
        const response = await fetch(`${process.env.REACT_APP_STATISTICS_API}`, {
            method: "POST",
            body: JSON.stringify(statistic),
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    // check if access token expired
    // ...
    return await createStatisticFn(statistic);
};

export const findAllSubjects = async (options: QueryOptions) => {
    const findAllSubjectsFn = async (options: QueryOptions) => {
        let pageNumber;
        let pageSize;


        if (options.queryKey) {
            pageNumber = Number(options.queryKey.at(2) as string) - 1;
            pageSize = options.queryKey.at(3) as string;
        }

        const response = await fetch(`${process.env.REACT_APP_STATISTICS_API}/subjects?page=${pageNumber}&size=${pageSize}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
            }
        });

        if (!response.ok) {
            throw await response.json();
        } else {
            return await response.json();
        }
    };

    // check if access token expired
    // ...
    return await findAllSubjectsFn(options);
};

export const findAllBySubject = async (options: QueryOptions) => {
    const findAllBySubjectFn = async (options: QueryOptions) => {
        let subject;
        let pageNumber;
        let pageSize;

        if (options.queryKey !== undefined) {
            subject = options.queryKey.at(3);
            pageNumber = Number(options.queryKey.at(4) as string) - 1;
            pageSize = options.queryKey.at(5) as string;
        }

        const response = await fetch(`${process.env.REACT_APP_STATISTICS_API}?subject=${subject}&page=${pageNumber}&size=${pageSize}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
            }
        });

        if (!response.ok) {
            throw await response.json();
        } else {
            return await response.json();
        }
    };

    // check if access token expired
    // ...
    return await findAllBySubjectFn(options);
};

export const deleteById = async (id: number) => {
    const deleteByIdFn = async (id: number) => {

        const response = await fetch(`${process.env.REACT_APP_STATISTICS_API}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
            }
        });

        if (!response.ok) {
            throw await response.json();
        } else {
            return response.text();
        }
    };

    // check if access token expired
    // ...
    return await deleteByIdFn(id);
};

export const deleteAllBySubject = async (subject: string) => {
    const deleteAllBySubjectFn = async (subject: string) => {

        const response = await fetch(`${process.env.REACT_APP_STATISTICS_API}?subject=${subject}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
            }
        });

        if (!response.ok) {
            throw await response.json();
        } else {
            return response.text();
        }
    };

    // check if access token expired
    // ...
    return await deleteAllBySubjectFn(subject);
};