import { ThingService } from "../../service/thing-service.js";
import { CreateController } from "./create-controller.js";
import { Router } from "../../util/router.js";
import { DateUtil } from "../../util/date-util.js";
import { StyleService } from "../../util/style-service.js";

class CreateBootstrapper {
  static start() {
    const dateUtil = new DateUtil();
    const thingService = new ThingService(dateUtil);
    const styleService = new StyleService();
    const router = new Router();
    const createController = new CreateController(router, thingService, styleService);
    createController.initView();
  };
};

// wait until scripts have been loaded
document.addEventListener("DOMContentLoaded", CreateBootstrapper.start);
