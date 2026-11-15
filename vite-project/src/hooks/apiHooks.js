import {useCallback, useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const media = await fetchData(
          `${import.meta.env.VITE_MEDIA_API}/media`,
        );
        const mediaWithUsers = await Promise.all(
          media.map(async (item) => {
            const result = await fetchData(
              `${import.meta.env.VITE_AUTH_API}/users/${item.user_id}`,
            );
            return {...item, username: result.username};
          }),
        );
        setMediaArray(mediaWithUsers);
      } catch (error) {
        console.error('Failed to fetch media:', error);
      }
    };

    getMedia();
  }, []);

  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = useCallback(async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      `${import.meta.env.VITE_AUTH_API}/auth/login`,
      fetchOptions,
    );
    const {token, ...safeLoginResult} = loginResult;
    console.log('Login result:', {
      ...safeLoginResult,
      ...(token ? {token: '[redacted]'} : {}),
    });
    return loginResult;
  }, []);

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = useCallback(async (token) => {
    return fetchData(`${import.meta.env.VITE_AUTH_API}/users/token`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }, []);

  const postUser = useCallback(async (inputs) => {
    return fetchData(`${import.meta.env.VITE_AUTH_API}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
  }, []);

  return {getUserByToken, postUser};
};

export {useAuthentication};
export {useUser};
export {useMedia};
