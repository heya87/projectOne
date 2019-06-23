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
    this.relevanceForm = document.getElementById("relevanceForm");
    this.styleSwitcher = document.getElementById("styleSwitcher");
    this.relevanceOne = document.getElementById("rel1");
    this.relevanceTwo = document.getElementById("rel2");
    this.relevanceThree = document.getElementById("rel3");
    this.relevanceFour = document.getElementById("rel4");
    this.relevanceFive = document.getElementById("rel5");
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
    for (var i = 0; i < this.relevanceForm.elements.length; i++) {
      if (this.relevanceForm.elements[i].checked) {
        relevance = i + 1;
      }
    }
    return relevance;
  }

  submitThing(event) {
    let description = this.textFieldDescription.value;
    let endDate = this.dateFieldEndDate.value;
    let relevance = this.getRelevance();

    if (this.validate(description, endDate, relevance)) {
      let id = this.getIdFromURL();
      if (this.getIdFromURL()) {
        this.thingService.updateThing(id, description, endDate, relevance);
      } else {
        this.thingService.createThing(description, endDate, relevance);
      }
      this.router.navigateToListView();
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
    this.relevanceForm.addEventListener("click", event => {});
    this.navigateToListButton.addEventListener("click", event =>
      this.router.navigateToListView()
    );
    this.styleSwitcher.addEventListener("click", event =>
      this.styleService.switch()
    );
  }
}
