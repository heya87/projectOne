function loadThings() {
  return JSON.parse(localStorage.getItem("things"));
}

function saveThing(titleValue, dateValue) {
  let thing = { title: titleValue, date: dateValue};
  let things = [];
  if (localStorage.getItem("things")) {
    things = JSON.parse(localStorage.getItem("things"));
  }
  things.push(thing);
  localStorage.setItem("things", JSON.stringify(things));
}

export { saveThing, loadThings };
