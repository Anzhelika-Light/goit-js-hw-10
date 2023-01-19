const e=document.querySelector("#search-box");document.querySelector(".country-list");e.addEventListener("click",(()=>{fetch("https://jsonplaceholder.typicode.com/users").then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>renderCountryList(e))).catch((e=>console.log(e)))}));
//# sourceMappingURL=index.e8ded081.js.map
