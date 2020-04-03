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
}