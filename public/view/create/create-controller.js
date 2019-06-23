const THING_STATE_NEW = "NEW";
export class CreateController {
  constructor(router, thingService, styleService) {
    this.router = router;
    this.thingService = thingService;
    this.styleService = styleService;

    this.textFieldDescription = document.getElementById("description");
    this.dateFieldEndDate = document.getElementById("endDate");
    this.submitButton = document.getElementById("submitButton");
    this.navigateToListButton = document.getElementById("navigateToListButton");
    this.thingForm = document.getElementById("thingForm");
    this.relevanceSet = document.getElementById("relevanceSet");
    this.styleSwitcher = document.getElementById("styleSwitcher");
    this.relevanceOne = document.getElementById("star1");
    this.relevanceTwo = document.getElementById("star2");
    this.relevanceThree = document.getElementById("star3");
    this.relevanceFour = document.getElementById("star4");
    this.relevanceFive = document.getElementById("star5");
  }

  setRelevance(relevance) {
    var relevanceTypes = {
      "1": () => (this.relevanceOne.checked = true),
      "2": () => (this.relevanceTwo.checked = true),
      "3": () => (this.relevanceThree.checked = true),
      "4": () => (this.relevanceFour.checked = true),
      "5": () => (this.relevanceFive.checked = true)
    };
    relevanceTypes[relevance]();
  }

  initView() {
    let id = this.getIdFromURL();
    if (id) {
      this.fillThing(id);
    }
    this.initEventHandler();
    this.initStyle();
  }

  initStyle() {
    this.styleSwitcher.checked = this.styleService.isDefault();
  }

  async fillThing(id) {
    this.doFill(await this.thingService.loadThingByID(id));
  }

  doFill(thing) {
    if (thing) {
      this.textFieldDescription.value = thing.description;
      this.dateFieldEndDate.value = thing.endDate;
      this.setRelevance(thing.relevance);
    }
  }

  getIdFromURL() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    return id;
  }

  getRelevance() {
    let relevance;
    for (var i = 0; i < this.relevanceSet.elements.length; i++) {
      if (this.relevanceSet.elements[i].checked) {
        relevance = i + 1;
      }
    }
    return 6- relevance;
  }

  submitThing(event) {
    let description = this.textFieldDescription.value;
    let endDate = this.dateFieldEndDate.value;
    let relevance = this.getRelevance();

    if (this.validate(description, endDate, relevance)) {
      let id = this.getIdFromURL();
      if (id) {
        this.thingService.updateThing(id, description, endDate, relevance, THING_STATE_NEW);
      } else {
        this.thingService.createThing(description, endDate, relevance);
      }
      //this.router.navigateToListView();
    }
  }

  validate(description, endDate, relevance) {
    let result = true;
    if (description == null || description == "" || description == undefined) {
      result = false;
    }
    if (endDate == null || endDate == "" || endDate == undefined) {
      result = false;
    }
    if (relevance == null || relevance == "" || relevance == undefined) {
      result = false;
    }
    return result;
  }

  initEventHandler() {
    this.submitButton.addEventListener("click", event => this.submitThing());
    this.navigateToListButton.addEventListener("click", event =>
      this.router.navigateToListView()
    );
    this.styleSwitcher.addEventListener("click", event =>
      this.styleService.switch()
    );
  }
}
