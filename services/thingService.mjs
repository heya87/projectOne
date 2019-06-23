export class ThingService {
  constructor(dateUtil, thingStore) {
    this.dateUtil = dateUtil;
    this.thingStore = thingStore;
  }

  async getThings(req, res) {
    res.json((await this.thingStore.all(req.query.orderType, req.query.doneOnly)) || []);
  }

  async getThing(req, res) {
    res.json((await this.thingStore.get(req.params.id)) || []);
  }

  createThing(req, res) {
    let id = 1;
    let createDate = this.dateUtil.now();
    this.thingStore.add(req.body.description, req.body.endDate, req.body.relevance, createDate)
  }

  updateThing(req, resp) {
    let id = req.params.id;
    let createDateValue = this.dateUtil.now();
    let thing = {
      id: id,
      description: req.body.description,
      createDate: createDateValue,
      endDate: req.body.endDate,
      relevance: req.body.relevance
    };
    console.log(thing);


//    let thingToUpdate = this.loadThingByID(id);
//    if (thingToUpdate) {
//      thingToUpdate.description = descriptionValue;
//      thingToUpdate.endDate = endDateValue;
//      thingToUpdate.relevance = relevanceValue;
//      let things = JSON.parse(localStorage.getItem("things"));
//      const index = things.findIndex(e => e.id === Number(id));
//      things[index] = thingToUpdate;
//      localStorage.setItem("things", JSON.stringify(things));
//    } else {
//      this.createThing(descriptionValue, endDateValue, relevanceValue);
//    }
  }

  deleteThing(req, res) {
    console.log("todo delete");
  }

  //works as long as we cant delete things, is going to be refactored when backend is there anyways
  generateUId() {
    let things = this.loadThings();
    if (things) {
      return things.length + 1;
    } else {
      return 1;
    }
  }
}
