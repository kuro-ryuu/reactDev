import PropTypes from 'prop-types';

const MediaRow = ({item, setSelectedItem}) => {
  return (
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.username}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleDateString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <button type="button" onClick={() => setSelectedItem(item)}>
          Show
        </button>
      </td>
    </tr>
  );
};

const mediaItemPropType = PropTypes.shape({
  media_id: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired,
  filename: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  filesize: PropTypes.number.isRequired,
  media_type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string,
  description: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
});

MediaRow.propTypes = {
  item: mediaItemPropType.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
