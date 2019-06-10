import { ThingService } from "./service/thing-service.js";
import { ListThingController} from "./view/list/list-thing-controller.js";
import { CreateThingController } from "./view/create/create-thing-controller.js";
import { Router } from "./util/Router.js";

const BASE_URL = "http://127.0.0.1:5500/projectOne/";
class Bootstrapper {
  static start() {
    const thingService = new ThingService();
    const router = new Router(BASE_URL);
    const listThingController = new ListThingController(router, thingService);
    const createThingController = new CreateThingController(router, thingService);
    router.navigateToCreateView();
  }
}

// wait until scripts have been loaded
document.addEventListener("DOMContentLoaded", Bootstrapper.start);
