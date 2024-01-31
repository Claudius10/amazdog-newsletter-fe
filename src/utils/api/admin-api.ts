import {QueryOptions} from "@tanstack/react-query/build/modern/index";
import {keyIsValid} from "../functions";
import {UpdateUserRoleQuery, UserDTO} from "./dtos/account";

export const findUserByEmail = async (options: QueryOptions) => {
    const findUserByEmailFn = async (options: QueryOptions) => {
        let email;

        if (options.queryKey) {
            email = options.queryKey.at(3);
        }

        const response = await fetch(`${process.env.REACT_APP_ADMIN_API}?userEmail=${email}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
            }
        });

        if (!response.ok) {
            throw await response.json();
        } else if (response.status === 202) {
            return await response.text();
        } else {
            return await response.json() as Promise<UserDTO>;
        }
    };

    if (keyIsValid()) {
        return await findUserByEmailFn(options);
    }
};

export const updateUserRole = async (data: UpdateUserRoleQuery) => {
    const updateUserRoleFn = async (data: UpdateUserRoleQuery) => {

        const response = await fetch(`${process.env.REACT_APP_ADMIN_API}?userId=${data.userId}&roleName=${data.roleName}&add=${data.add}`, {
            method: "PUT",
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

    if (keyIsValid()) {
        return await updateUserRoleFn(data);
    }
};

export const enableAccount = async (email: string) => {
    const enableAccountFn = async (email: string) => {

        const response = await fetch(`${process.env.REACT_APP_ADMIN_API}?userEmail=${email}`, {
            method: "PUT",
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

    if (keyIsValid()) {
        return await enableAccountFn(email);
    }
};

export const disableAccount = async (email: string) => {
    const disableAccountFn = async (email: string) => {

        const response = await fetch(`${process.env.REACT_APP_ADMIN_API}?userEmail=${email}`, {
            method: "PUT",
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

    if (keyIsValid()) {
        return await disableAccountFn(email);
    }
};