const CREATE_URL = "view/create/create.html";
const LIST_URL = "view/list/list.html";

export class Router {
  constructor(baseUrl, listThingController, createThingController) {
    this.baseUrl = baseUrl;
    this.listThingController = listThingController;
    this.createThingController = createThingController;
  }

  navigateToCreateView(id) {
    if (id) {
      window.location.replace(`${this.baseUrl}${CREATE_URL}?id=${id}`);
    } else {
      window.location.replace(`${this.baseUrl}${CREATE_URL}`);
    }
  }

  navigateToListView() {
    window.location.replace(`${this.baseUrl}${LIST_URL}`);
  }
}
