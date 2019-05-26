import {
  createThing,
  updateThing,
  loadThingByID
} from "../../service/thingService.js";

const BASE_URL = "http://127.0.0.1:5500/projectOne/";
const TEXTFIELD_THING = "description";
const TEXTFIELD_DATE = "endDate";

function initView() {
  let id = getIdFromURL();
  if (id) {
    let thing = loadThingByID(id);
    if (thing) {
      document.getElementById(TEXTFIELD_THING).value = thing.description;
      document.getElementById(TEXTFIELD_DATE).value = thing.endDate;
    }
  }
}

function getIdFromURL() {
  let urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");
  return id;
}

function submitThing(event) {
  let description = document.getElementById(TEXTFIELD_THING).value;
  let endDate = document.getElementById(TEXTFIELD_DATE).value;
  let relevance = getRelevance();
  let id = getIdFromURL();
  if (getIdFromURL) {
    updateThing(id, description, endDate, relevance);
  } else {
    createThing(description, endDate, relevance);
  }
  window.location.replace(BASE_URL + "index.html");
}

function getRelevance() {
  let relevance;
  let relevanceForm = document.getElementById("relevanceForm");
  for (var i = 0; i < relevanceForm.elements.length; i++) {
    if (relevanceForm.elements[i].checked) {
      relevance = i + 1;
    }
  }
  return relevance;
}

document
  .getElementById("thingForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();
    submitThing(event);
  });

document
  .getElementById("relevanceForm")
  .addEventListener("click", function(event) {
    //todo update css
    console.log(`Relevance ${getRelevance()} selected`);
  });

initView();
