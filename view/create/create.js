import {
  createThing,
  updateThing,
  loadThingByID
} from "../../service/thingService.js";

const BASE_URL = "http://127.0.0.1:5500/projectOne/";
const TEXTFIELD_THING = "thing";
const TEXTFIELD_DATE = "date";

function initView() {
  let id = getIdFromURL();
  if (id) {
    let thing = loadThingByID(id);
    if (thing) {
      document.getElementById(TEXTFIELD_THING).value = thing.title;
      document.getElementById(TEXTFIELD_DATE).value = thing.date;
    }
  }
}

function getIdFromURL() {
  let urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");
  return id;
}

function submitThing(event) {
  let title = document.getElementById(TEXTFIELD_THING).value;
  let date = document.getElementById(TEXTFIELD_DATE).value;
  let id = getIdFromURL();
  if (getIdFromURL) {
    updateThing(id, title, date);
  } else {
    createThing(title, date);
  }
  window.location.replace(BASE_URL + "index.html");
}

document
  .getElementById("thingForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();
    submitThing(event);
  });

initView();
