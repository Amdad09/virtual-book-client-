import axios from 'axios';
import { use, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAxiosSecure = () => {
    const { user } = use(AuthContext);
    const token = user?.accessToken;

    const axiosSecure = useMemo(() => {
        const instance = axios.create({
            baseURL: 'http://localhost:3000',
        });

        instance.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        return instance;
    }, [token]);

    return axiosSecure;
};

export default useAxiosSecure;
