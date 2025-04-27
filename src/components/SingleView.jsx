import PropTypes from 'prop-types';
import Likes from './Likes';

const SingleView = (props) => {
  const { item, setSelectedItem } = props;

  const handleClick = () => {
    setSelectedItem(null);
  };

  return (
    <>
      {item && (
        <dialog
          open
          className="fixed top-10 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-purple-900 p-6 rounded-lg shadow-lg text-white overflow-auto z-50"
        >
          <div className="flex justify-end">
            <button
              onClick={handleClick}
              className="text-2xl font-bold hover:text-red-400 transition"
            >
              &times;
            </button>
          </div>

          <div className="flex flex-col items-center">
            {item.media_type.includes('video') ? (
              <video src={item.filename} controls className="w-full rounded-md mb-4" />
            ) : (
              <img src={item.filename} alt={item.title} className="w-full rounded-md mb-4" />
            )}

            <h3 className="text-2xl font-bold mb-2">Title: {item.title}</h3>
            <p className="text-sm mb-4 text-gray-200">{item.description}</p>

            <Likes item={item} />
          </div>
        </dialog>
      )}
    </>
  );
};

SingleView.propTypes = {
  item: PropTypes.object,
  setSelectedItem: PropTypes.func.isRequired,
};

export default SingleView;
