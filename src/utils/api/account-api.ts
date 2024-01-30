import {AccountDeleteQuery, EmailUpdateQuery, NameUpdateQuery, PasswordUpdateQuery} from "./dtos/account";
import {keyIsValid} from "../functions";

export const updatePassword = async (data: PasswordUpdateQuery) => {
    const updatePasswordFn = async (data: PasswordUpdateQuery) => {
        const response = await fetch(`${process.env.REACT_APP_USER_API}/password?userId=${data.userId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data.data)
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    if (keyIsValid()) {
        return await updatePasswordFn(data);
    }
};

export const updateName = async (data: NameUpdateQuery) => {
    const updateNameFn = async (data: NameUpdateQuery) => {
        const response = await fetch(`${process.env.REACT_APP_USER_API}/name?userId=${data.userId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data.data)
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    if (keyIsValid()) {
        return await updateNameFn(data);
    }
};

export const updateEmail = async (data: EmailUpdateQuery) => {
    const updateEmailFn = async (data: EmailUpdateQuery) => {
        const response = await fetch(`${process.env.REACT_APP_USER_API}/email?userId=${data.userId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data.data)
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    if (keyIsValid()) {
        return await updateEmailFn(data);
    }
};

export const deleteAccount = async (data: AccountDeleteQuery) => {
    const deleteAccountFn = async (data: AccountDeleteQuery) => {
        const response = await fetch(`${process.env.REACT_APP_USER_API}?userId=${data.userId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data.data)
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    if (keyIsValid()) {
        return await deleteAccountFn(data);
    }
};