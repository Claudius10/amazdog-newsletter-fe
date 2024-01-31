type Role = {
    id: number;
    authority: string;
}

export type UserDTO = {
    id: number;
    name: string;
    email: string;
    roles: Role[];
    isEnabled: boolean;
}

export type PasswordChangeDTO = {
    currentPassword: string;
    newPassword: string;
    matchingNewPassword: string;
}

export type PasswordResetDTO = {
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

export type UpdateUserRoleQuery = {
    userId: number;
    roleName: string;
    add: boolean;
}