import PropTypes from 'prop-types';

const MediaRow = (props) => {
  const {item, selectedItem, setSelectedItem} = props;

  return (
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleDateString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <Link to="/single" state={{item}}>
          Show
        </Link>
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
  description: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
});

MediaRow.propTypes = {
  item: mediaItemPropType.isRequired,
  selectedItem: PropTypes.oneOfType([
    mediaItemPropType,
    PropTypes.oneOf([null]),
  ]).isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
