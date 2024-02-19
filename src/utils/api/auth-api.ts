import {LoginDTO, LoginSuccessDTO, RegisterDTO} from "./dtos/auth";
import {PasswordResetDTO} from "./dtos/account";

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

export const requestPasswordReset = async (email: string) => {
    const response = await fetch(`${process.env.REACT_APP_ANON_API}/password?resetFor=${email}`, {
        method: "POST"
    });
    if (!response.ok) {
        throw await response.text();
    }
};

export const resetPassword = async (props: { data: PasswordResetDTO, token: string }) => {
    const response = await fetch(`${process.env.REACT_APP_ANON_API}/password?resetToken=${props.token}`, {
        method: "POST",
        body: JSON.stringify(props.data),
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        throw await response.json();
    }
};
