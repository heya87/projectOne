export class ListController {
  constructor(router, thingService, styleService) {
    this.router = router;
    this.thingService = thingService;
    this.styleService = styleService;
    this.thingRenderer = Handlebars.compile(
      document.querySelector("#thing-template").innerHTML
    );

    this.thingContainer = document.querySelector("#thingContainer");
    this.navigateToCreateButton = document.getElementById("navigateToCreate");
    this.styleSwitcher = document.getElementById("styleSwitcher");
  }

  async initView() {
    this.renderThings();

    this.navigateToCreateButton.addEventListener("click", event =>
      this.router.navigateToCreateView()
    );

    this.thingContainer.addEventListener("click", async event =>
      await this.editClickEventHandler(event)
    );

    this.styleSwitcher.addEventListener("click", event =>
      this.styleService.switch()
    );
  }

  sortByFinishUntil(things) {
    console.log(things);
    //    if (things) {
    //      things.sort(function(a, b) {
    //        a = new Date(a.createDate);
    //        b = new Date(b.createDate);
    //        let result = a > b ? 1 : a < b ? -1 : 0;
    //        return result;
    //      });
    //    }
  }

  async renderThings() {
    this.thingContainer.innerHTML = this.thingRenderer({
      things: await this.thingService.loadThings()
    });
  }

  async editClickEventHandler(event) {
    if (event.target.classList.contains("js-edit")) {
      await this.router.navigateToCreateView(event.target.dataset.id);
    }
  }
}
