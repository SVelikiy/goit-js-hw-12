import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export async function getImg({q="",key = '44778676-049b64250b69e7d3e774d3724', image_type = 'photo',orientation = 'horizontal',safesearch = true, page= 1, per_page= 15}) {
    try {
        const response = await axios.get(
            BASE_URL, {
            params: {
                q,
                key,
                image_type,
                orientation,
                safesearch,
                page,
                per_page
            }
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            throw new Error(`Error: ${error.response.status} - ${error.response.data}`);
        } else {
            throw new Error(error.message);
        }
    }
    
};