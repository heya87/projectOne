const ORDER_TYPE_END_DATE = "endDate";
const ORDER_TYPE_CREATE_DATE = "createDate";
const ORDER_TYPE_RELEVANCE = "relevance";

const THING_STATE_DONE = "DONE";

export class ListController {
  constructor(router, thingService, styleService) {
    this.router = router;
    this.thingService = thingService;
    this.styleService = styleService;
    this.thingRenderer = Handlebars.compile(
      document.querySelector("#thing-template").innerHTML
    );

    this.orderType = ORDER_TYPE_END_DATE;

    this.thingContainer = document.querySelector("#thingContainer");
    this.navigateToCreateButton = document.getElementById("navigateToCreate");
    this.styleSwitcher = document.getElementById("styleSwitcher");
    this.orderByEndDateRadio = document.getElementById("orderByEndDate");
    this.orderByCreateDateRadio = document.getElementById("orderByCreateDate");
    this.orderByRelevanceRadio = document.getElementById("orderByRelevance");
    this.doneOnlyCheckbox = document.getElementById("showDone");
  }

  async initView() {
    this.orderByEndDateRadio.checked = true;
    this.renderThings();
    this.initStyle();

    this.navigateToCreateButton.addEventListener("click", event =>
      this.router.navigateToCreateView()
    );

    this.thingContainer.addEventListener(
      "click",
      async event => await this.editClickEventHandler(event)
    );

    this.thingContainer.addEventListener(
      "click",
      event => this.doneClickEventHandler(event)
    );

    this.styleSwitcher.addEventListener("click", event =>
      this.styleService.switch()
    );

    this.orderByEndDateRadio.addEventListener("click", event => {
      this.orderType = ORDER_TYPE_END_DATE;
      this.renderThings();
    });
    this.orderByCreateDateRadio.addEventListener("click", event => {
      this.orderType = ORDER_TYPE_CREATE_DATE;
      this.renderThings();
    });
    this.orderByRelevanceRadio.addEventListener("click", event => {
      this.orderType = ORDER_TYPE_RELEVANCE;
      this.renderThings();
    });

    this.doneOnlyCheckbox.addEventListener("click", event => {
      this.renderThings();
    });
    
    feather.replace();
  }

  async renderThings() {
    this.thingContainer.innerHTML = this.thingRenderer({
      things: await this.thingService.loadThings(
        this.orderType,
        this.doneOnlyCheckbox.checked
      )
    });
  }

  initStyle() {
    this.styleSwitcher.checked = this.styleService.isDefault();
  }

  editClickEventHandler(event) {
    if (event.target.classList.contains("js-edit")) {
      this.router.navigateToCreateView(event.target.dataset.id);
    }
  }

  async doneClickEventHandler(event) {
    if (event.target.classList.contains("js-done")) {
      let id = event.target.dataset.id;
      let thingToUpdate = await this.thingService.loadThingByID(id);
      this.thingService.updateThing(
        id,
        thingToUpdate.description,
        thingToUpdate.endDate,
        thingToUpdate.relevance,
        THING_STATE_DONE
      );
      this.renderThings();
    }
  }
}
