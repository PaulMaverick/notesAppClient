import { User } from '../models/user';
import axios from 'axios'

export async function getLoggedInUser(): Promise<User> {
    const response = await axios.get('http://localhost:5000/api/users', { withCredentials: true });
    return response.data;
}

export interface SignUpBody {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpBody): Promise<User> {
    const response = await axios.post('http://localhost:5000/api/users/signup', credentials, { withCredentials: true });
    console.log(response.data)
    return response.data;

}

export interface LoginBody {
    username: string,
    password: string,
}

export async function login(credentials: LoginBody): Promise<User> {
    const response = await axios.post('http://localhost:5000/api/users/login', credentials, { withCredentials: true });
    return response.data;
}

export async function logout() {
    await axios.post('http://localhost:5000/api/users/logout');
}