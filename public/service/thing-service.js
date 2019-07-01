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
    return await this.httpService.ajax("POST", "/thing/", {
      description: descriptionValue,
      endDate: endDateValue,
      relevance: relevanceValue
    });
  }

  async updateThing(id, descriptionValue, endDateValue, relevanceValue, stateValue) {
    let route = `/thing/${id}/`;
    return await this.httpService.ajax("PUT", route, {
      description: descriptionValue,
      endDate: endDateValue,
      relevance: relevanceValue,
      state: stateValue
    });
  }
}
