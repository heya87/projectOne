import { loadThings } from "./service/thingService.js";
window.BASE_URL = "http://127.0.0.1:5500/projectOne/";

function initView() {
  let things = loadThings();
  sortByFinishUntil(things);
  fillThings(things);
  document
    .getElementById("things")
    .addEventListener("click", editClickEventHandler);
}

function sortByFinishUntil(things) {
  things.sort(function(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    let result = a > b ? 1 : a < b ? -1 : 0;
    return result;
  });
}

function sortByFinisUntil(things) {
  things.sort(function(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a > b ? -1 : a < b ? 1 : 0;
  });
}

function fillThings(things) {
  let list = document.getElementById("things");
  things.forEach(element => {
    let newItem = document.createElement("li");
    let newText = document.createTextNode(
      `Thing i want to do: ${element.title} until: ${element.date}`
    );
    let button = document.createElement("button");
    button.setAttribute("data-id", element.id);
    button.innerHTML = "Edit";
    newItem.appendChild(newText);
    newItem.appendChild(button);
    list.appendChild(newItem);
  });
}

function editClickEventHandler(event) {
  let id = event.target.dataset.id;
  //window.location.replace(`${BASE_URL}create.html?id=${id}`);
  window.location.replace(`${BASE_URL}view/create/create.html?id=${id}`);
}
initView();
