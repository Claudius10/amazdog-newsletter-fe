import {LoginDTO, LoginSuccessDTO, RegisterDTO} from "./dtos/auth";

export const registerFn = async (data: RegisterDTO) => {
    const response = await fetch(`${process.env.REACT_APP_ANON_API}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        throw await response.json();
    }
};

export const activationFn = async (token: string) => {
    const response = await fetch(`${process.env.REACT_APP_ANON_API}/activate?token=${token}`, {
        method: "POST",
    });
    if (!response.ok) {
        throw await response.json();
    }
};


export const loginFn = async (data: LoginDTO) => {
    const response = await fetch(`${process.env.REACT_APP_LOGIN_API}?username=${data.email}&password=${data.password}`, {
        method: "POST",
    });

    if (!response.ok) {
        throw await response.json();
    } else {
        return await response.json() as LoginSuccessDTO;
    }
};
