export interface Credentials {
    username: string;
    password: string;
}

export interface NewUser {
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

export const EMPTY_USER: User = {
    id: null,
    firstName: null,
    lastName: null,
    username: null,
    email: null
};
