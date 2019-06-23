export class ThingService {
  constructor(httpService) {
    this.httpService = httpService;
  }

  async loadThings(orderType, doneOnly) {
    return await this.httpService.ajax("GET", `/thing?orderType=${orderType}&doneOnly=${doneOnly}`, undefined);
  }

  async loadThingByID(id) {
    return await this.httpService.ajax("GET", `/thing/${id}`, undefined);
  }

  async createThing(descriptionValue, endDateValue, relevanceValue) {
    console.log('creating');
    return await this.httpService.ajax("POST", "/thing/", {
      description: descriptionValue,
      endDate: endDateValue,
      relevance: relevanceValue
    });
  }

  async updateThing(id, descriptionValue, endDateValue, relevanceValue) {
    console.log('updating');
    let route = `/thing/${id}/`;
    return await this.httpService.ajax("PUT", route, {
      description: descriptionValue,
      endDate: endDateValue,
      relevance: relevanceValue
    });
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
