import $api from '../http/Htttp'
import {AxiosResponse} from 'axios'
import {AuthResponse, IUser} from '../models/AuthResponse'

export default class AuthService{
    static login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/login', {email, password})
    }
    
    static register(first_name: string, last_name: string, gender: string, email: string, password: string): Promise<AxiosResponse>{
        return $api.post<AxiosResponse>('/registration', {first_name, last_name, gender, email, password})
    }

    static logout(): Promise<void>{
        return $api.post('/logout')
    }

    static getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}