import { ThingService } from "./service/thing-service.js";
import { ThingController } from "./thing-controller.js";
import { CreateThingController } from "./view/create/create-thing-controller.js";

class Bootstrapper {
  static start() {
    const thingService = new ThingService();
    const thingController = new ThingController(thingService);
    thingController.initView();
    const createThingController = new CreateThingController(thingService);
    createThingController.initView();
  }
}

// wait until scripts have been loaded
document.addEventListener("DOMContentLoaded", Bootstrapper.start);
