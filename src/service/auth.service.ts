//import { LoginPayload, LoginResponse } from '@/types/auth.types';
import axios from 'axios';
import { LoginPayload, LoginResponse } from '../types/auth.types';
//import type { LoginResponse, LoginPayload } from '@/types/auth.types';

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://172.21.2.20/posgrado';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
    const query = `
        mutation {
            login(username: "${payload.username}", password: "${payload.password}", ip: "${payload.ip}") { 
                success              
                message
                usuario {
                  username
                }
                accessToken
            }
        }
    `;
    try {
        const response = await axiosInstance.post('', { query });
        return response.data.data.login;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Error in GraphQL request');
        }
        throw error;
    }
};