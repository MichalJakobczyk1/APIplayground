import "../scss/main.scss";

// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

/* place your code below */

const API_URL = "https://api.punkapi.com/v2/beers";
const container = document.querySelector(".container");

const render = (data) => {
  if (!data.length) return;
  const fragment = document.createDocumentFragment();
  data.forEach(({ name, tagline, description, image_url: imageURL }) => {
    const div = document.createElement("div");
    div.classList.add("beer");
    div.innerHTML = `
    <img class="beer__image" src="${imageURL}"/>
    <div class="beer__content">
        <h2 class="beer__title">${name}</h2>
            <p class="beer__tagline">${tagline}</p>
             <p class="beer__description">${description}</p>
      </div>
   `;
    fragment.appendChild(div);
  });
  container.appendChild(fragment);
};

const success = (data) => {
  const beers = JSON.parse(data.target.responseText);
  render(beers);
  //   console.log(beers[1].name);
};

const error = (err) => {
  console.log(err);
};

const req = new XMLHttpRequest();
req.onload = success;
req.onerror = error;
req.open("GET", API_URL);
req.send();
