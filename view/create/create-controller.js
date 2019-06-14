export class CreateController {
  constructor(router, thingService) {
    this.router = router;
    this.thingService = thingService;

    this.textFieldDescription = document.getElementById("description");
    this.dateFieldEndDate = document.getElementById("endDate");
    this.submitButton = document.getElementById("submitButton");
    this.navigateToListButton = document.getElementById("navigateToListButton");
    this.thingForm = document.getElementById("thingForm");
    this.relevanceForm = document.getElementById("relevanceForm");
  }

  initView() {
    let id = this.getIdFromURL();
    if (id) {
      let thing = this.thingService.loadThingByID(id);
      if (thing) {
        this.textFieldDescription.value = thing.description;
        this.dateFieldEndDate.value = thing.endDate;
      }
    }
    this.initEventHandler();
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
    let id = this.getIdFromURL();
    if (this.getIdFromURL) {
      this.thingService.updateThing(id, description, endDate, relevance);
    } else {
      this.thing.createThing(description, endDate, relevance);
    }
    this.router.navigateToListView();
  }

  initEventHandler() {
    this.submitButton.addEventListener("click", event => this.submitThing());
    this.relevanceForm.addEventListener("click", event => {
      console.log("update relevance css here");
    });
    this.navigateToListButton.addEventListener("click", event =>
      this.router.navigateToListView()
    );
  }
}
