const BASE_URL = "http://127.0.0.1:5500/projectOne/";
export class ThingController {
  constructor(thingService) {
    this.thingService = thingService;
  }

  initView() {
    this.thingService.loadThings();
    let things = this.thingService.loadThings();
    this.sortByFinishUntil(things);
    this.fillThings(things);
    document
      .getElementById("things")
      .addEventListener("click", this.editClickEventHandler);
  }

  sortByFinishUntil(things) {
    things.sort(function(a, b) {
      a = new Date(a.createDate);
      b = new Date(b.createDate);
      let result = a > b ? 1 : a < b ? -1 : 0;
      return result;
    });
  }

  fillThings(things) {
    let list = document.getElementById("things");
    things.forEach(element => {
      let newItem = document.createElement("li");
      let newText = document.createTextNode(
        `Thing i want to do: ${element.description} until: ${element.endDate}
         relevance: ${element.relevance}
         createDate: ${element.createDate}
      `
      );
      let button = document.createElement("button");
      button.setAttribute("data-id", element.id);
      button.innerHTML = "Edit";
      newItem.appendChild(newText);
      newItem.appendChild(button);
      list.appendChild(newItem);
    });
  }

  editClickEventHandler(event) {
    let id = event.target.dataset.id;
    //window.location.replace(`${BASE_URL}create.html?id=${id}`);
    window.location.replace(`${BASE_URL}view/create/create.html?id=${id}`);
  }
}
