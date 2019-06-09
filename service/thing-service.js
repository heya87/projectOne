export class ThingService {
  constructor() {}

  loadThings() {
    return JSON.parse(localStorage.getItem("things"));
  }

  loadThingByID(id) {
    let things = loadThings();
    if (things) {
      let thing = things.find(thing => thing.id === Number(id));
      return thing;
    } else {
      return undefined;
    }
  }

  createThing(descriptionValue, endDateValue, relevanceValue) {
    let id = generateUId();
    let createDateValue = now();
    let thing = {
      id: id,
      description: descriptionValue,
      createDate: createDateValue,
      endDate: endDateValue,
      relevance: relevanceValue
    };
    let things = [];
    if (localStorage.getItem("things")) {
      things = JSON.parse(localStorage.getItem("things"));
    }
    things.push(thing);
    localStorage.setItem("things", JSON.stringify(things));
  }

  updateThing(id, descriptionValue, endDateValue, relevanceValue) {
    let thingToUpdate = loadThingByID(id);
    if (thingToUpdate) {
      thingToUpdate.description = descriptionValue;
      thingToUpdate.endDate = endDateValue;
      thingToUpdate.relevance = relevanceValue;
      let things = JSON.parse(localStorage.getItem("things"));
      const index = things.findIndex(e => e.id === Number(id));
      things[index] = thingToUpdate;
      localStorage.setItem("things", JSON.stringify(things));
    } else {
      createThing(descriptionValue, endDateValue, relevanceValue);
    }
  }

  //works as long as we cant delete things, is going to be refactored when backend is there anyways
  generateUId() {
    let things = loadThings();
    if (things) {
      return things.length + 1;
    } else {
      return 1;
    }
  }
}
