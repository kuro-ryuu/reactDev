import {useLocation, useNavigate} from 'react-router';

const Single = ({item: selectedItem, setSelectedItem}) => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const isInline = typeof setSelectedItem === 'function';
  const item = isInline ? selectedItem : state?.item;

  if (isInline && !item) {
    return null;
  }

  const isImage = item.media_type.startsWith('image/');
  const isVideo = item.media_type.startsWith('video/');

  return (
    <>
      <button
        type="button"
        onClick={() => (isInline ? setSelectedItem(null) : navigate(-1))}
      >
        {isInline ? 'Close' : 'Go back'}
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
      <p>Owner: {item.username}</p>
      <p>{item.description}</p>
    </>
  );
};

export default Single;
