import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
loader.style.display = 'block';
breedSelect.style.display = 'none';
fetchBreeds()
  .then(breeds => {
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
    try {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error while processing breeds:', error);
    }
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong while fetching breeds. Try reloading the page!'
    );
    loader.style.display = 'none';
    console.error('Error while fetching breeds:', error);
  });
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
      });
  }
});
