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

    const postMedia = async (file, inputs, token) => {
        const data = {
            ...inputs,
            ...file,
        };
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer: ' + token,
            },
            body: JSON.stringify(data),
        };
        const mediaResult = await fetchData(`${mediaApiUrl}/media`, fetchOptions);
        console.log('Post media results:  ', mediaResult);
        return mediaResult;
    };

    return { mediaArray, postMedia };
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

const useFile = () => {
    const postFile = async (file, token) => {
        const formData = new FormData();
        formData.append('file', file);
        const uploadResult = await fetchData(
            import.meta.env.VITE_UPLOAD_SERVER + '/upload',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer: ' + token,
                },
                mode: 'cors',
                body: formData,
            },
        );
        return uploadResult;
    };
    return { postFile };
};

export { useMedia, useAuthentication, useUser, useFile };
