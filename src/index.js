import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

// Initially, set the loader to 'block'
loader.style.display = 'block';

// Завантаження списку порід при завантаженні сторінки
fetchBreeds()
  .then(breeds => {
    // Hide the loader once data is loaded
    loader.style.display = 'none';
    try {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error while processing breeds:', error);
      // Handle the error as needed, e.g., displaying an error message.
    }
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong while fetching breeds. Try reloading the page!'
    );
    // Hide the loader in case of an error
    loader.style.display = 'none';
    console.error('Error while fetching breeds:', error);
    // Handle the error as needed.
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
        catInfo.style.display = 'flex';
        const catImage = document.createElement('img');
        catImage.src = cat.url;

        catInfo.innerHTML = '';

        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');

        const catName = document.createElement('h1');
        catName.textContent = cat.breeds[0].name;
        const catDescription = document.createElement('p');
        catDescription.textContent = cat.breeds[0].description;
        const catTemperamentHeading = document.createElement('h3');
        catTemperamentHeading.textContent = 'Темперамент:';
        const catTemperament = document.createElement('p');
        catTemperament.textContent = cat.breeds[0].temperament;

        textContainer.appendChild(catName);
        textContainer.appendChild(catDescription);
        textContainer.appendChild(catTemperamentHeading);
        textContainer.appendChild(catTemperament);

        catInfo.appendChild(catImage);
        catInfo.appendChild(textContainer);
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'Oops! Something went wrong while fetching cat information. Try reloading the page!'
        );
        loader.style.display = 'none';
        console.error('Error while fetching cat information:', error);
        // Handle the error as needed.
      });
  }
});
