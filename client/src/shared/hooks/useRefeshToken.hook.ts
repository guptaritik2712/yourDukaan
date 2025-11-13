import { useAuth } from '@/shared/hooks/useAuth.hook';
import { useCallback } from 'react';
import { useApi } from './useApi.hook';

export const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { authApi } = useApi();

    const refresh = useCallback(async () => {
        try {
            const response = await authApi.refreshToken();

            // Check if response is valid and has accessToken
            if (response && typeof response === 'object' && 'accessToken' in response) {
                setAuth({ user: response.user, accessToken: response.accessToken });
            } else {
                console.error('Invalid refresh token response:', response);
            }
        } catch (error) {
            console.error('Failed to refresh token:', error);
            throw error;
        }
    }, []);

    return refresh;
};
