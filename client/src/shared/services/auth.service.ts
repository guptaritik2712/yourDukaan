import { ResponseError } from '@/shared/types/api.types';
import type { User } from '@/shared/types/entities.types';
import { useCallback } from 'react';
import { AxiosInstance } from 'axios';

export type RefreshTokenResponse = {
    accessToken: string;
    user: User;
};

type useAuthServiceProps = {
    PRIVATE_API: AxiosInstance;
};

export const useAuthService = ({ PRIVATE_API }: useAuthServiceProps) => {
    const refreshToken = useCallback(async (): Promise<RefreshTokenResponse | ResponseError> => {
        try {
            const response = await PRIVATE_API.get('/auth/refresh-token');

            // Validate response is JSON and has expected structure
            if (response.data && typeof response.data === 'object') {
                return response.data;
            } else {
                console.error('Invalid response format from refresh token endpoint');
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }, [PRIVATE_API]);

    return { refreshToken };
};
