import axios from 'axios';

const API_KEY = '48447542-64438fdfaeeaa1a5314542701';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export const fetchImages = async (query, page = 1) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return { hits: [], totalHits: 0 };
  }
};
