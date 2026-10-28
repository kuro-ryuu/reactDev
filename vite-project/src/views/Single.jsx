import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  if (!item) {
    return (
      <>
        <p>No media item was selected.</p>
        <button type="button" onClick={() => navigate(-1)}>
          Go back
        </button>
      </>
    );
  }

  const isImage = item.media_type.startsWith('image/');
  const isVideo = item.media_type.startsWith('video/');

  return (
    <>
      <button type="button" onClick={() => navigate(-1)}>
        Go back
      </button>
      <h3 id="media-title">{item.title}</h3>
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
