import Datastore from "nedb-promise";

const THING_STATE_NEW = "NEW";
const THING_STATE_DONE = "DONE";
const THING_STATE_DELETED = "DELETED";

const ORDER_TYPE_END_DATE = "endDate";
const ORDER_TYPE_CREATE_DATE = "createDate";
const ORDER_TYPE_RELEVANCE = "relevance";

export class Thing {
  constructor(description, endDate, relevance, createDate) {
    this.description = description;
    this.endDate = endDate;
    this.relevance = relevance;
    this.createDate = createDate;
    this.state = THING_STATE_NEW;
  }
}

export class ThingStore {
  constructor() {
    this.db = new Datastore({ filename: "./data/things.db", autoload: true });

    this.orderTypeQueries = {
      createDate: { createDate: -1 },
      endDate: { endDate: 1 },
      relevance: { relevance: -1 }
    };
  }

  async add(description, endDate, relevance, createDate) {
    let thing = new Thing(description, endDate, relevance, createDate);
    return await this.db.insert(thing);
  }

  async delete(id) {
    await this.db.update(
      { _id: id },
      { $set: { state: Thing.THING_STATE_DELETED } }
    );
    return await this.get(id);
  }

  async get(id) {
    let result = await this.db.findOne({ _id: id });
    return result;
  }

  async all(orderType, doneOnly) {
    let searchTerm;
    if (doneOnly == "false") {
      searchTerm = { $or: [{ state: "NEW" }, { state: "DONE" }] };
    } else {
      searchTerm = { state: "DONE" };
    }

    return await this.db
      .cfind(searchTerm)
      .sort(this.orderTypeQueries[orderType])
      .exec();
  }
}
