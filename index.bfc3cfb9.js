!function(){var t=document.querySelector("#search-box");document.querySelector(".country-list");t.addEventListener("click",(function(){fetch("https://jsonplaceholder.typicode.com/users").then((function(t){if(!t.ok)throw new Error(t.status);return t.json()})).then((function(t){return renderCountryList(t)})).catch((function(t){return console.log(t)}))}))}();
//# sourceMappingURL=index.bfc3cfb9.js.map