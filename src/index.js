import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

// Завантаження списку порід при завантаженні сторінки
fetchBreeds()
  .then(breeds => {
    loader.style.display = 'none';
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(() => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    loader.style.display = 'none';
  });

// Обробник події для вибору породи
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  if (selectedBreedId) {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
    error.style.display = 'none';
    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        loader.style.display = 'none';
        catInfo.style.display = 'flex'; // Змінити display на 'flex', щоб відображати текст поруч із зображенням
        const catImage = document.createElement('img');
        catImage.src = cat.url;

        catInfo.innerHTML = ''; // Очищаємо контейнер catInfo перед додаванням нових елементів

        // Створюємо контейнери для текстової інформації
        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');

        // Додаємо текстову інформацію до контейнера textContainer
        const catName = document.createElement('h1');
        catName.textContent = cat.breeds[0].name;
        const catDescription = document.createElement('p');
        catDescription.textContent = cat.breeds[0].description;
        const catTemperamentHeading = document.createElement('h3');
        catTemperamentHeading.textContent = 'Темперамент:';
        const catTemperament = document.createElement('p');
        catTemperament.textContent = cat.breeds[0].temperament;

        // Додаємо всі тексти до textContainer
        textContainer.appendChild(catName);
        textContainer.appendChild(catDescription);
        textContainer.appendChild(catTemperamentHeading);
        textContainer.appendChild(catTemperament);

        // Додаємо зображення і textContainer до catInfo
        catInfo.appendChild(catImage);
        catInfo.appendChild(textContainer);
      })
      .catch(() => {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        loader.style.display = 'none';
      });
  }
});
