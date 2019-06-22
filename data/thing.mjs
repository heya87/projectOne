//export const THING_STATE_NEW = "NEW";
//export const THING_STATE_DELETED = "DELETED";

export class Thing {
  constructor(description, endDate, relevance, createDate) {
    this.description = description;
    this.endDate = endDate;
    this.relevance = relevance;
    this.createDate = createDate;
    this.state = THING_STATE_NEW;
  }
}
