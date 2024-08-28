export interface AuthResponse{
    accessToken: string;
    user: IUser
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    position: string;
    isActivated: boolean;
}