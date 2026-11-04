import {useEffect, useState} from 'react';
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

export {useMedia};
