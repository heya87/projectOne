import { saveThing } from "../../service/thingService.js";

const BASE_URL = "http://127.0.0.1:5500/projectOne/";

function submitThing(event) {
  let title = document.getElementById("thing").value;
  let date = document.getElementById("date").value;
  saveThing(title, date);
}

document.getElementById('thingForm').addEventListener('submit', function(event){
    event.preventDefault();
    submitThing(event);
});