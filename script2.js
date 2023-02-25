"use strict";
//form
const form = document.querySelector(".pinpoint-form");

// get elements
const direct = document.querySelector(".direct");
const light = document.querySelector(".light");
const dish = document.querySelector(".dish");
const equip = document.querySelector(".equip");
const cost = document.querySelector(".cost");
const hours = document.querySelector(".hours");
const power = document.querySelector(".power");
const subject = document.querySelector(".subject");

//input fields
const titleInput = document.querySelector("#title");
const descInput = document.querySelector("#desc");
const directInput = document.querySelector("#direct");
const subjectInput = document.querySelector("#subject");
const equipInput = document.querySelector("#equip");
const dishInput = document.querySelector("#dish");
const costInput = document.querySelector("#cost");
const powerInput = document.querySelector("#power");
const hoursInput = document.querySelector("#hours");
const lightInput = document.querySelector("#light");

const inputType = document.querySelector(".input-type");
const inputForm = document.querySelector(".input-form");
const list = document.querySelector("#list");
const details = document.querySelector("#details");

const fields = [direct, light, dish, equip, cost, hours, power, subject];
const allInputs = [
  titleInput,
  descInput,
  directInput,
  subjectInput,
  equipInput,
  dishInput,
  costInput,
  powerInput,
  hoursInput,
  lightInput,
];

/// map stuff

class App {
  //protected instance variables
  #map;
  #mapZoomLevel = 15;
  #mapEvent;
  #collection = [];

  constructor() {
    // run when page loads
    this._getPosition();

    // initialize event listeners

    form.addEventListener("submit", this._newPinpoint.bind(this));
    inputType.addEventListener("change", this._toggleFields);
    list.addEventListener("click", this._showPinpoint.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        (err) => {
          //console.log(err.message);
          alert(`${err.message}: Could not get Location!`);
        }
      );
    } else console.log("Geolocation not Supported");
  }

  _loadMap(pos) {
    const { latitude, longitude } = pos.coords;
    const location = [latitude, longitude];

    // the sring that is passed to the L.map() function must be the id of an element on your page.

    this.#map = L.map("map").setView(location, this.#mapZoomLevel);

    // to get other themes https://leaflet-extras.github.io/leaflet-providers/preview/index.html

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Handling clicks on map

    this.#map.on("click", this._showForm.bind(this));
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    inputForm.classList.remove("hidden");
    titleInput.focus();
  }

  _hideForm() {
    for (const item of allInputs) {
      item.value = "";
    }
    inputForm.classList.add("hidden");
  }
  _toggleFields() {
    for (const item of fields) {
      const itemClasses = item.attributes[0].nodeValue.split(" ");
      if (!itemClasses.includes("hidden")) item.classList.add("hidden");
    }

    if (inputType.value === "photo") {
      for (const item of [direct, subject, equip]) {
        item.classList.remove("hidden");
      }
    }

    if (inputType.value === "resturant") {
      for (const item of [dish, cost]) {
        item.classList.remove("hidden");
      }
    }

    if (inputType.value === "study") {
      for (const item of [power, hours, light]) {
        item.classList.remove("hidden");
      }
    }
  }
  _newPinpoint(event) {
    //prevent reload
    event.preventDefault();

    //get data from form

    const type = inputType.value;
    const title = titleInput.value;
    const desc = descInput.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let pinpoint;

    // create objects based on type

    if (type === "photo") {
      const direct = directInput.value;
      const subject = subjectInput.value;
      const equip = equipInput.value;

      pinpoint = new Photo([lat, lng], title, desc, direct, subject, equip);
    }

    if (type === "resturant") {
      const dish = dishInput.value;
      const cost = costInput.value;

      pinpoint = new Resturant([lat, lng], title, desc, dish, cost);
    }

    if (type === "study") {
      const power = powerInput.value;
      const hours = hoursInput.value;
      const light = lightInput.value;

      pinpoint = new Study([lat, lng], title, desc, power, hours, light);
    }

    // add object to main collection
    this.#collection.push(pinpoint);

    // render pin as a marker on the map
    this._renderPinpointMarker(pinpoint);

    // render pinpoint on list
    this._renderPinpoint(pinpoint);

    // hide form clear values
    this._hideForm();

    console.log(pinpoint);
  }

  _renderPinpointMarker(pinpoint) {
    L.marker(pinpoint.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          // add classname here
        })
      )
      .setPopupContent(`${pinpoint.title}`)
      .openPopup();
  }

  _renderPinpoint(pinpoint) {
    const html = `
    <div id="${
      pinpoint.id
    }" class="m-4 p-2 border-4 border-drblue-500 rounded-xl bg-topaz-500">
        <p class="font-quicksand">
            ${pinpoint.type}:
            <span class="font-chuckfive text-drblue-500"
            >${pinpoint.title}</span>
        </p>
        <p class="font-quicksand">Created ${(pinpoint.date + "").slice(
          4,
          15
        )}</p>
    </div>
    `;
    list.insertAdjacentHTML("beforeend", html);
  }

  _showPinpoint(e) {
    const pinElement = e.target.closest("div");
    const idString = pinElement.attributes[0];

    const pinData = this.#collection.find((item) => item.id === idString.value);
    console.log(pinData);
    this.#map.setView(pinData.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    let html = `
        <h1 class="text-center font-chuckfive text-xl text-drblue-500">
          Details
        </h1>
        <hr class="border-drblue-500 border-2" />
        <p class="font-quicksand">
          <span class="text-drblue-500 font-chuckfive mr-3">Title:</span>
          ${pinData.title}
        </p>
        <p class="font-quicksand">
          <span class="text-drblue-500 font-chuckfive mr-3">Description:</span
          >${[pinData.description]}
        </p>
        
    `;
    if (pinData.type === "Photo")
      html += `
        <p class="font-quicksand">
            <span class="text-drblue-500 font-chuckfive mr-3">Direction:</span
            >${pinData.direction}
        </p>
        <p class="font-quicksand">
            <span class="text-drblue-500 font-chuckfive mr-3">Subjects:</span>${pinData.subject}
        </p>
        <p class="font-quicksand">
            <span class="text-drblue-500 font-chuckfive mr-3">Equipment:</span>${pinData.equip}
        </p>
  `;
    if (pinData.type === "Resturant")
      html += `
        <p class="font-quicksand">
            <span class="text-drblue-500 font-chuckfive mr-3">Fav Dish:</span
            >${pinData.dish}
        </p>
        <p class="font-quicksand">
            <span class="text-drblue-500 font-chuckfive mr-3">Cost:</span>${pinData.cost}
        </p>
  `;
    if (pinData.type === "Study")
      html += `
        <p class="font-quicksand">
            <span class="text-drblue-500 font-chuckfive mr-3">Available Power:</span
            >${pinData.power}
        </p>
        <p class="font-quicksand">
            <span class="text-drblue-500 font-chuckfive mr-3">Hours:</span>${pinData.hours}
        </p>
        <p class="font-quicksand">
            <span class="text-drblue-500 font-chuckfive mr-3">Lighting:</span>${pinData.light}
        </p>
  `;
    details.innerHTML = html;
  }
}

class Pinpoint {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, title, description) {
    this.coords = coords; // [lat, lng]
    this.title = title;
    this.description = description;
  }
}

class Photo extends Pinpoint {
  type = "Photo";
  constructor(coords, title, description, direction, subject, equip) {
    super(coords, title, description);
    this.direction = direction;
    this.subject = subject;
    this.equip = equip;
  }
}

class Resturant extends Pinpoint {
  type = "Resturant";
  constructor(coords, title, description, dish, cost) {
    super(coords, title, description);
    this.dish = dish;
    this.cost = cost;
  }
}

class Study extends Pinpoint {
  type = "Study";
  constructor(coords, title, description, power, hours, light) {
    super(coords, title, description);
    this.power = power;
    this.hours = hours;
    this.light = light;
  }
}

const app = new App();
