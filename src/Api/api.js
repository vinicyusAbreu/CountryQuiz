import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://restcountries.com/v2',
});

export const questions = async (url, setData) => {
    const response = await api.get(url);
    setData(response.data);
}