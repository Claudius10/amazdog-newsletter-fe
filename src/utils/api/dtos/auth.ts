export type RegisterDTO = {
    name: string;
    email: string,
    matchingEmail: string,
    password: string,
    matchingPassword: string,
}

export type LoginDTO = {
    email: string;
    password: string;
}


export type LoginSuccessDTO = {
    ACCESS_TOKEN: string;
    ACCESS_EXP: string;
    USER_EMAIL: string;
    USER_NAME: string;
    USER_ID: string;
    USER_ROLE: string;
}
