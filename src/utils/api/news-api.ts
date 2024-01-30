import {NewsDTO} from "./dtos/news";
import {QueryOptions} from "@tanstack/react-query/build/modern";
import {keyIsValid} from "../functions";

type StateUpdate = {
    id: number;
    state: boolean;
}

export const createNews = async (news: NewsDTO) => {
    const createNewsFn = async (news: NewsDTO) => {
        const response = await fetch(`${process.env.REACT_APP_NEWS_API}`, {
            method: "POST",
            body: JSON.stringify(news),
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
        return await createNewsFn(news);
    }
};

export const findAllNews = async (options: QueryOptions) => {
    const findAllNewsFn = async (options: QueryOptions) => {
        let pageNumber;
        let pageSize;


        if (options.queryKey) {
            pageNumber = Number(options.queryKey.at(2) as string) - 1;
            pageSize = options.queryKey.at(3) as string;
        }

        const response = await fetch(`${process.env.REACT_APP_NEWS_API}?page=${pageNumber}&size=${pageSize}`, {
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

    if (keyIsValid()) {
        return await findAllNewsFn(options);
    }
};

export const findNewsById = async (options: QueryOptions) => {
    const findNewsByIdFn = async (options: QueryOptions) => {
        let id;

        if (options.queryKey) {
            id = options.queryKey.at(1);
        }

        const response = await fetch(`${process.env.REACT_APP_NEWS_API}/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
            }
        });

        if (!response.ok) {
            throw await response.json();
        } else {
            return await response.json() as Promise<NewsDTO>;
        }
    };

    if (keyIsValid()) {
        return await findNewsByIdFn(options);
    }
};

export const findActiveNews = async () => {
    const findActiveNewsFn = async () => {
        const response = await fetch(`${process.env.REACT_APP_RESOURCES_API}/news/active`);

        if (!response.ok) {
            throw await response.json();
        } else {
            return await response.json() as Promise<NewsDTO[]>;
        }
    };

    return await findActiveNewsFn();
};

export const findActiveNewsById = async (options: QueryOptions) => {
    const findActiveNewsByIdFn = async (options: QueryOptions) => {
        let id;

        if (options.queryKey) {
            id = options.queryKey.at(2);
        }

        const response = await fetch(`${process.env.REACT_APP_RESOURCES_API}/news/active/${id}`);

        if (!response.ok) {
            throw await response.json();
        } else {
            return await response.json() as Promise<NewsDTO>;
        }
    };

    return await findActiveNewsByIdFn(options);
};

export const updateState = async (data: StateUpdate) => {
    const updateStateFn = async (data: StateUpdate) => {

        const response = await fetch(`${process.env.REACT_APP_NEWS_API}/${data.id}/${data.state}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
            }
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    if (keyIsValid()) {
        return await updateStateFn(data);
    }
};


export const deleteNewsById = async (id: number) => {
    const deleteNewsByIdFn = async (id: number) => {

        const response = await fetch(`${process.env.REACT_APP_NEWS_API}/${id}`, {
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
        return await deleteNewsByIdFn(id);
    }
};
