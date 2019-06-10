export class ListThingController {
  constructor(router, thingService) {
    this.router = router;
    this.thingService = thingService;
  }

  static initView() {
    this.thingService.loadThings();
    let things = this.thingService.loadThings();
    this.sortByFinishUntil(things);
    this.fillThings(things);
    document
      .getElementById("things")
      .addEventListener("click", this.editClickEventHandler);


    document
      .getElementById("navigateToCreate")
      .addEventListener("click", function(event) {
        event.preventDefault();
        console.log("im here");
        router.navigateToCreateView();
      });
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
    this.router.navigateToCreateView(id);
  }
}

document.addEventListener("DOMContentLoaded", ListThingController.initView);
