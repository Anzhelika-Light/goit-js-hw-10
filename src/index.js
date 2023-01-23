var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;

function onInput(e) {
  // санітизація введеного рядка методом trim() - прибирає пробіли на початку і в кінці рядка
  const country = inputEl.value.trim();
  if (country === '') {
    countryList.innerHTML = '';
    return;
  }
  fetchCountries(country)
    .then(data => {
      const [countryData] = data;

      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryList.innerHTML = '';
        return;
      }

      if (data.length <= 10 && data.length >= 2) {
        countryList.innerHTML = '';
        createCountryList(data);
        
        return;
      }

      countryList.innerHTML = '';
      createCountryCard(data);
    })
    .catch(err => {
      console.log(err);
      if (err.message === '404') {
        countryList.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
}

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function createCountryCard(countryData) {
  const countryMarkup = countryData.map(({name,capital,population,flags,languages} = countryData) =>
  `<li class="country">
          <div class="country__header">
            <img
              class="country__flag"
              src="${flags.svg}"
              alt="Country flag"
              height="40"
            />
            <p class="country__name">${name.official}</p>
          </div>
          <p class="country__info"><span>Capital:</span> ${capital}</p>
          <p class="country__info"><span>Population:</span> ${population}</p>
          <p class="country__info"><span>Languages:</span> ${Object.values(languages).join(', ')}</p>
        </li>`).join('');
  
  return countryList.insertAdjacentHTML("beforeend", countryMarkup);
}

function createCountryList(countryData) {
  const countryItem = countryData.map(({flags, name} = countryData) =>
  `<li class="country">
        <div class="country__header">
            <img
                class="country__flag"
                src="${flags.svg}"
                alt="country flag"
                width="35"
                height="40"
            />
            <p class="country__name--list">${name.official}</p>
        </div>
    </li>`
  ).join('');

  countryList.insertAdjacentHTML('beforeend', countryItem);
}
