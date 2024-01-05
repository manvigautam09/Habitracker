import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AccessTokenPayload {
  accessToken: string;
  expiresAt: number;
}

type AccessTokenStore = {
  accessToken: string | null;
  isLoading: boolean;
  fetch: () => void;
  set: (token: string) => void;
  remove: () => void;
};

export const useAccessTokenStore = create<AccessTokenStore>(set => ({
  accessToken: null,
  isLoading: true,
  fetch: async () => {
    const token = await AsyncStorage.getItem('accessToken');
    set({accessToken: token, isLoading: false});
  },

  set: token => set({accessToken: token}),
  remove: () => set({accessToken: null}),
}));

export const useGetAccessToken = () => {
  const {set, remove, accessToken, isLoading, fetch} = useAccessTokenStore();

  const setAccessToken = async (payload: AccessTokenPayload) => {
    set(payload.accessToken);
    await AsyncStorage.setItem('accessToken', payload.accessToken);
  };

  const removeAccessToken = async () => {
    remove();
    await AsyncStorage.removeItem('accessToken');
  };

  return {accessToken, isLoading, fetch, setAccessToken, removeAccessToken};
};
