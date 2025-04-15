import { fetchData } from '../utils/fetchData';
import { useEffect, useState } from 'react';

const mediaApiUrl = import.meta.env.VITE_MEDIA_API;

const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    const getMedia = async () => {
        try {
            const mediaData = await fetchData(`${mediaApiUrl}/media`);

            setMediaArray(mediaData);

            const authApiUrl = import.meta.env.VITE_AUTH_API;
            const newData = await Promise.all(
                mediaData.map(async (item) => {
                    const data = await fetchData(`${authApiUrl}/users/${item.user_id}`);
                    return { ...item, username: data.username };
                }),
            );

            console.log('Media array: ', mediaArray);
            console.log('new data', newData);
            setMediaArray(newData);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    useEffect(() => {
        getMedia();
    }, []);

    return { mediaArray };
};

export default useMedia;
