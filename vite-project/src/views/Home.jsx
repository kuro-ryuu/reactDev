import MediaRow from '../components/MediaRow';
import {fetchData} from '../utils/fetchData';
import {useEffect, useState} from 'react';

const Home = () => {
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

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Owner</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
