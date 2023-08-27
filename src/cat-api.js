import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_TJsaqooqBlwz6F47HLbtbnOdczo8WZEKMqv43Bb4ZWH9Q8KR3ILyJHWSu0md2mow';

// Функція для отримання списку порід
export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Функція для отримання інформації про кота за ідентифікатором породи
export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    throw error;
  }
}
