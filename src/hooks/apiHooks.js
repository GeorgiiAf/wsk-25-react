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

const useAuthentication = () => {
    const postLogin = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        };
        const loginResult = await fetchData(
            import.meta.env.VITE_AUTH_API + '/auth/login',
            fetchOptions,
        );
        console.log('loginresult', loginResult);
        window.localStorage.setItem('token', loginResult.token);
        return loginResult;
    };

    return { postLogin };
};

const useUser = () => {
    const postUser = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        };
        const registerResult = await fetchData(
            import.meta.env.VITE_AUTH_API + '/users',
            fetchOptions,
        );
        console.log('Post user results:  ', registerResult);
        return registerResult;
    };

    const getUserByToken = async (token) => {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer: ' + token,
            },
        };
        const userResult = await fetchData(
            import.meta.env.VITE_AUTH_API + '/users/token',
            fetchOptions,
        );
        console.log('userResult: ', userResult);
        return userResult;
    };

    return { getUserByToken, postUser };
};

export { useMedia, useAuthentication, useUser };
