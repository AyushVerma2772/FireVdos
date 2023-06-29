import axios from 'axios';

const base_url = 'https://yt-api.p.rapidapi.com';

const options = {
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    }
};


export const fetchFromAPI = async (url) => {
    try {
        
        const { data } = await axios.get(base_url + '/' + url, options);
        console.log("API call for ...", url)

        return data;

    } catch (error) {
        console.error(error);
    }
}