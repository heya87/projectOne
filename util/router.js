const BASE_URL = "http://127.0.0.1:5500/projectOne/";
const CREATE_URL = "view/create/create.html";
const LIST_URL = "view/list/list.html";

export class Router {
  constructor() {}

  navigateToCreateView() {
    window.location.replace(`${BASE_URL}${CREATE_URL}`);
  }

  navigateToCreateView(id) {
    if (id) {
      window.location.replace(`${BASE_URL}${CREATE_URL}?id=${id}`);
    } else {
      window.location.replace(`${BASE_URL}${CREATE_URL}`);
    }
  }

  navigateToListView() {
    window.location.replace(`${BASE_URL}${LIST_URL}`);
  }
}
