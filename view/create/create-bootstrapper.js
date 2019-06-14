import { ThingService } from "../../service/thing-service.js";
import { CreateController } from "./create-controller.js";
import { Router } from "../../util/router.js";
import { DateUtil } from "../../util/date-util.js";

class CreateBootstrapper {
  static start() {
    const dateUtil = new DateUtil();
    const thingService = new ThingService(dateUtil);
    const router = new Router();
    const createController = new CreateController(router, thingService);
    createController.initView();
  };
};

// wait until scripts have been loaded
document.addEventListener("DOMContentLoaded", CreateBootstrapper.start);
