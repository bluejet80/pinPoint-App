"use strict";
const button = document.querySelector(".button");

let map;

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
        form.classList.remove("hidden");
        inputDistance.focus();
      });
    },
    (err) => {
      //console.log(err.message);
      alert(`${err.message}: Could not get Location!`);
    }
  );
else console.log("Geolocation not Supported");
