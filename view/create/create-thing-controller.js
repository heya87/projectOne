const TEXTFIELD_THING = "description";
const TEXTFIELD_DATE = "endDate";

export class CreateThingController {
  constructor(router, thingService) {
    this.router = router;
    this.thingService = thingService;
  }

  static initView() {
    let id = this.getIdFromURL();
    if (id) {
      let thing = this.thingService.loadThingByID(id);
      if (thing) {
        document.getElementById(TEXTFIELD_THING).value = thing.description;
        document.getElementById(TEXTFIELD_DATE).value = thing.endDate;
      }
    }
    this.initEventHandler();
  }

  getIdFromURL() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    return id;
  }

  submitThing(event) {
    let description = document.getElementById(TEXTFIELD_THING).value;
    let endDate = document.getElementById(TEXTFIELD_DATE).value;
    let relevance = getRelevance();
    let id = getIdFromURL();
    if (getIdFromURL) {
      this.thingService.updateThing(id, description, endDate, relevance);
    } else {
      this.thing.createThing(description, endDate, relevance);
    }
    this.router.navigateToListView();
  }

  getRelevance() {
    let relevance;
    let relevanceForm = document.getElementById("relevanceForm");
    for (var i = 0; i < relevanceForm.elements.length; i++) {
      if (relevanceForm.elements[i].checked) {
        relevance = i + 1;
      }
    }
    return relevance;
  }

  initEventHandler() {
    document
      .getElementById("thingForm")
      .addEventListener("submit", function(event) {
        event.preventDefault();
        submitThing(event);
      });

    document
      .getElementById("relevanceForm")
      .addEventListener("click", function(event) {
        //todo update css
        console.log(`Relevance ${getRelevance()} selected`);
      });

    document
      .getElementById("navigateToList")
      .addEventListener("click", function(event) {
        router.navigateToListView();
      });
  }
}

document.addEventListener("DOMContentLoaded", CreateThingController.initView);