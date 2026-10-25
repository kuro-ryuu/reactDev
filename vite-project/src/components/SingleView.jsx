import PropTypes from 'prop-types';

const SingleView = ({item, selectedItem, setSelectedItem}) => {
  const isImage = item.media_type.startsWith('image/');
  const isVideo = item.media_type.startsWith('video/');

  return (
    <dialog open={Boolean(selectedItem)} aria-labelledby="media-title">
      <button type="button" onClick={() => setSelectedItem(null)}>
        Back to media
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
    </dialog>
  );
};

SingleView.propTypes = {
  item: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  selectedItem: PropTypes.shape({
    media_type: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};
export default SingleView;
