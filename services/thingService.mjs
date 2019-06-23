export class ThingService {
  constructor(dateUtil, thingStore) {
    this.dateUtil = dateUtil;
    this.thingStore = thingStore;
  }

  async getThings(req, res) {
    res.json(
      (await this.thingStore.all(req.query.orderType, req.query.doneOnly)) || []
    );
  }

  async getThing(req, res) {
    res.json((await this.thingStore.get(req.params.id)) || []);
  }

  createThing(req, res) {
    console.log("creating");
    let id = 1;
    let createDate = this.dateUtil.now();
    this.thingStore.add(
      req.body.description,
      req.body.endDate,
      req.body.relevance,
      createDate
    );
  }

  updateThing(req, resp) {
    this.thingStore.update(
      req.params.id,
      req.body.description,
      req.body.endDate,
      req.body.relevance
    );
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
