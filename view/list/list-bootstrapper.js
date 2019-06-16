import { ThingService } from "../../service/thing-service.js";
import { ListController } from "./list-controller.js";
import { Router } from "../../util/router.js";
import { DateUtil } from "../../util/date-util.js";
import { StyleService } from "../../util/style-service.js";

class ListBootstrapper {
  static start() {
    const dateUtil = new DateUtil();
    const thingService = new ThingService(dateUtil);
    const styleService = new StyleService();
    const router = new Router();
    const listController = new ListController(router, thingService, styleService);
    listController.initView();
  };
};

// wait until scripts have been loaded
document.addEventListener("DOMContentLoaded", ListBootstrapper.start);
