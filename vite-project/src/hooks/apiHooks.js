import {useCallback, useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const postMedia = useCallback(async (fileData, inputs, token) => {
    const media = {
      filename: fileData.filename,
      filesize: fileData.filesize,
      media_type: fileData.media_type,
      title: inputs.title,
      description: inputs.description,
    };
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/media`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(media),
    });
  }, []);

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

  return {mediaArray, postMedia};
};

const useFile = () => {
  const postFile = useCallback(async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetchData(`${import.meta.env.VITE_UPLOAD_SERVER}/upload`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });
  }, []);

  return {postFile};
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
export {useFile};
