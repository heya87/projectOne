export class ThingService {
  constructor(httpService) {
    this.httpService = httpService;
  }

  async loadThings() {
    return await this.httpService.ajax("GET", "/thing/", undefined);
  }

  async loadThingByID(id) {
    return await this.httpService.ajax("GET", `/thing/${id}`, undefined);
  }

  async createThing(descriptionValue, endDateValue, relevanceValue) {
    return await this.httpService.ajax("POST", "/thing/", {
      description: descriptionValue,
      endDate: endDateValue,
      relevance: relevanceValue
    });
  }

  async updateThing(id, descriptionValue, endDateValue, relevanceValue) {
    let route = `/thing/${id}/`;
    return await this.httpService.ajax("POST", route, {
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
