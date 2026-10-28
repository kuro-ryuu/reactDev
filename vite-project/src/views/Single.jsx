import {Link, useLocation} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const item = state?.item;

  if (!item) {
    return (
      <>
        <p>No media item was selected.</p>
        <Link to="/">Back to media</Link>
      </>
    );
  }

  const isImage = item.media_type.startsWith('image/');
  const isVideo = item.media_type.startsWith('video/');

  return (
    <>
      <Link to="/">Back to media</Link>
      <h2>{item.title}</h2>
      {isImage && <img src={item.filename} alt={item.title} />}
      {isVideo && (
        <video controls>
          <source src={item.filename} type={item.media_type} />
          Your browser does not support video playback
        </video>
      )}
      {!isImage && !isVideo && <a href={item.filename}>Open media file</a>}
      <p>{item.description}</p>
    </>
  );
};

export default Single;