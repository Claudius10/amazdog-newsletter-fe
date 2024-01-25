export type PasswordChangeDTO = {
    currentPassword: string;
    newPassword: string;
    matchingNewPassword: string;
}

export type NameChangeDTO = {
    name: string;
    password: string;
}

export type EmailChangeDTO = {
    email: string;
    password: string;
}

export type PasswordDTO = {
    password: string;
}

export type NameUpdateQuery = {
    data: NameChangeDTO;
    userId: number;
}

export type EmailUpdateQuery = {
    data: EmailChangeDTO;
    userId: number;
}

export type PasswordUpdateQuery = {
    data: PasswordChangeDTO;
    userId: number;
}

export type AccountDeleteQuery = {
    data: PasswordDTO;
    userId: number;
}