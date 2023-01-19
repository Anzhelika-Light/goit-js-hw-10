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

        for (let i = 0; i < 10; i += 1) {
          createCountryList(data[i]);
        }
        return;
      }

      createCountryCard(countryData);
    })
    .catch(err => {
      console.dir(err);
      if (err.message === '404') {
        countryList.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
}

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function createCountryCard(countryData) {
  const languages = Object.values(countryData.languages).join(', ');
  countryList.innerHTML = `<li class="country">
          <div class="country__header">
            <img
              class="country__flag"
              src="${countryData.flags.svg}"
              alt="Country flag"
              height="40"
            />
            <p class="country__name">${countryData.name.official}</p>
          </div>
          <p class="country__info"><span>Capital:</span> ${countryData.capital}</p>
          <p class="country__info"><span>Population:</span> ${countryData.population}</p>
          <p class="country__info"><span>Languages:</span> ${languages}</p>
        </li>`;
}

function createCountryList(countryData) {
  let countryItem = `<li class="country">
        <div class="country__header">
            <img
                class="country__flag"
                src="${countryData.flags.svg}"
                alt="country flag"
                width="35"
                height="40"
            />
            <p class="country__name--list">${countryData.name.official}</p>
        </div>
    </li>`;
  countryList.insertAdjacentHTML('beforeend', countryItem);
}
