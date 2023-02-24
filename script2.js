"use strict";
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

const inputType = document.querySelector(".input-type");
const inputForm = document.querySelector(".input-form");

const fields = [direct, light, dish, equip, cost, hours, power, subject];

/// map stuff

let map, mapEvent;

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      const location = [latitude, longitude];

      // the sring that is passed to the L.map() function must be the id of an element on your page.

      map = L.map("map").setView(location, 15);

      // to get other themes https://leaflet-extras.github.io/leaflet-providers/preview/index.html

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //Handling clicks on map

      map.on("click", (mapE) => {
        mapEvent = mapE;
        inputForm.classList.remove("hidden");
        titleInput.focus();
      });
    },
    (err) => {
      //console.log(err.message);
      alert(`${err.message}: Could not get Location!`);
    }
  );
else console.log("Geolocation not Supported");

/// functions

const toggleFields = function () {
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
};

inputType.addEventListener("change", toggleFields);
