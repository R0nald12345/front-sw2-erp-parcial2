"use client";

import { useState } from 'react';
import { LoginPayload, LoginResponse } from '../types/auth.types';
import { loginUser } from '../service/auth.service';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (payload: LoginPayload): Promise<LoginResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginUser(payload);
            
            // Save token in localStorage
            if (response.accessToken) {
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('user', JSON.stringify(response.usuario));
            }
            
            return response;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login error';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        loading,
        error,
    };
};