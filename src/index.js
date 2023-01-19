import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const InputEl = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");

InputEl.addEventListener("click", () => {
  fetchCountries()
    .then((countries) => renderCountryList(countries))
    .catch((error) => console.log(error));
});

function fetchCountries() {
  return fetch("https://jsonplaceholder.typicode.com/users").then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}