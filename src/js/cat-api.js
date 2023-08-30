import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] =
  'live_TJsaqooqBlwz6F47HLbtbnOdczo8WZEKMqv43Bb4ZWH9Q8KR3ILyJHWSu0md2mow';

// Функція для отримання списку порід
export async function fetchBreeds() {
  const response = await axios.get(`${BASE_URL}/breeds`);
  return response.data;
}

// Функція для отримання інформації про кота за ідентифікатором породи
export async function fetchCatByBreed(breedId) {
  const response = await axios.get(
    `${BASE_URL}/images/search?breed_ids=${breedId}`
  );
  return response.data[0];
}
