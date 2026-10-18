import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

function getApiKey() {
  const key = import.meta.env.VITE_PIXABAY_API_KEY?.trim();
  if (!key) {
    throw new Error('Missing VITE_PIXABAY_API_KEY');
  }
  return key;
}

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: getApiKey(),
      q: query,
      page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}
