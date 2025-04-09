const SingleView = (props) => {
    const { item, setSelectedItem } = props;
    return (
        <>
            {item && (
                <dialog open>
                    {item.media_type.includes('video') ? (
                        <video src={item.filename} controls />
                    ) : (
                        <img src={item.filename} alt={item.title} />
                    )}
                    <h3>Title: {item.title}</h3>
                    <p>{item.description}</p>
                    <button onClick={() => setSelectedItem(null)}>Close</button>
                </dialog>
            )}
        </>

    );
};

export default SingleView;