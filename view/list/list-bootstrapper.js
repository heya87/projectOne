import { ThingService } from "../../service/thing-service.js";
import { ListController } from "./list-controller.js";
import { Router } from "../../util/router.js";
import { DateUtil } from "../../util/date-util.js";

class ListBootstrapper {
  static start() {
    const dateUtil = new DateUtil();
    const thingService = new ThingService(dateUtil);
    const router = new Router();
    const listController = new ListController(router, thingService);
    listController.initView();
  };
};

// wait until scripts have been loaded
document.addEventListener("DOMContentLoaded", ListBootstrapper.start);
