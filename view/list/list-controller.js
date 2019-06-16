export class ListController {
  constructor(router, thingService, styleService) {
    this.router = router;
    this.thingService = thingService;
    this.styleService = styleService;

    this.thingsList = document.getElementById("things");
    this.navigateToCreateButton = document.getElementById("navigateToCreate");
    this.styleSwitcher= document.getElementById("styleSwitcher");
  }

  initView() {
    let things = this.thingService.loadThings();
    this.sortByFinishUntil(things);
    this.fillThings(things);

    this.thingsList.addEventListener("click", event =>
      this.editClickEventHandler(event)
    );

    this.navigateToCreateButton.addEventListener(
      "click",
      event => this.router.navigateToCreateView()
    );

    this.styleSwitcher.addEventListener("click", event =>
      this.styleService.switch()
    );
  }

  sortByFinishUntil(things) {
    if (things) {
      things.sort(function(a, b) {
        a = new Date(a.createDate);
        b = new Date(b.createDate);
        let result = a > b ? 1 : a < b ? -1 : 0;
        return result;
      });
    }
  }

  fillThings(things) {
    if (things) {
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
  }

  editClickEventHandler(event) {
    let id = event.target.dataset.id;
    this.router.navigateToCreateView(id);
  }
}
