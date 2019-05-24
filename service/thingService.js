function loadThings() {
  return JSON.parse(localStorage.getItem("things"));
}

function loadThingByID(id) {
  let things = loadThings();
  if (things) {
    let thing = things.find(thing => thing.id === Number(id));
    return thing;
  } else {
    return undefined;
  }
}

function createThing(titleValue, dateValue) {
  let id = generateUId();
  let thing = { id: id, title: titleValue, date: dateValue };
  let things = [];
  if (localStorage.getItem("things")) {
    things = JSON.parse(localStorage.getItem("things"));
  }
  things.push(thing);
  localStorage.setItem("things", JSON.stringify(things));
}

function updateThing(id, titleValue, dateValue) {
  let thingToUpdate = loadThingByID(id);
  if (thingToUpdate) {
    thingToUpdate.title = titleValue;
    thingToUpdate.date = dateValue;
    let things = JSON.parse(localStorage.getItem("things"));
    const index = things.findIndex(e => e.id === Number(id));
    things[index] = thingToUpdate;
    localStorage.setItem("things", JSON.stringify(things));
  } else {
    createThing(titleValue, dateValue);
  }
}

//works as long as we cant delete things, is going to be refactored when backend is there anyways
function generateUId() {
  let things = loadThings();
  if (things) {
    return things.length + 1;
  } else {
    return 1;
  }
}

export { createThing, updateThing, loadThings, loadThingByID };
