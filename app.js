import { loadThings } from "./service/thingService.js";

function initView() {
  let things = loadThings();
  fillThings(things);
}

function fillThings(things) {
  let list = document.getElementById("things");
  things.forEach(element => {
    let newItem = document.createElement("li");
    let newText = document.createTextNode(
      `Thing i want to do: ${element.title} until: ${element.date}`
    );
    newItem.appendChild(newText);
    list.appendChild(newItem);
  });
}
initView();
