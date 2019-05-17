const BASE_URL = "http://127.0.0.1:5500/projectOne/"

function submitThing(event) {
  event.preventDefault();
  let title = document.getElementById("thing").value;
  let description = document.getElementById("description").value;
  saveThing(title, description);
}

function saveThing(titleValue, descriptionValue) {
  let thing = { title: titleValue, description: descriptionValue };
  let things = [];
  if (localStorage.getItem("things")) {
    things = JSON.parse(localStorage.getItem("things"));
  }
  things.push(thing);projectOne/index.html
  localStorage.setItem("things", JSON.stringify(things));
    window.location.replace(BASE_URL + "index.html");
}
