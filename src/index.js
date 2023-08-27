import { fetchBreeds, fetchCatByBreed } from './cat-api';

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
    loader.style.display = 'none';
    error.style.display = 'block';
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
        catInfo.style.display = 'block';
        const catImage = document.createElement('img');
        catImage.src = cat.url;
        catInfo.innerHTML = `
          <h2>Назва породи:</h2>
          <p>${cat.breeds[0].name}</p>
          <h2>Опис породи:</h2>
          <p>${cat.breeds[0].description}</p>
          <h2>Темперамент:</h2>
          <p>${cat.breeds[0].temperament}</p>
        `;
        catInfo.appendChild(catImage);
      })
      .catch(() => {
        loader.style.display = 'none';
        error.style.display = 'block';
      });
  }
});
