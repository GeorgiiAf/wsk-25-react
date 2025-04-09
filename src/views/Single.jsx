import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';

const Single = () => {
    const { state } = useLocation();
    console.log('state ', state);
    const item = state.item;
    const navigate = useNavigate();
    return (
        <>
            {' '}
            {item.media_type.includes('video') ? (
                <video src={item.filename} controls />
            ) : (
                <img src={item.filename} alt={item.title} />
            )}
            <h3>Title: {item.title}</h3>
            <p>{item.description}</p>
            <button onClick={() => navigate(-1)}>Go back</button>
        </>
    );
};

Single.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Single;
