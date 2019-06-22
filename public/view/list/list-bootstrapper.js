import { ThingService } from "../../service/thing-service.js";
import { ListController } from "./list-controller.js";
import { Router } from "../../util/router.js";
import { StyleService } from "../../util/style-service.js";
import { HttpService } from "../../service/http-service.js";

class ListBootstrapper {
  static start() {
    const httpService = new HttpService();
    const thingService = new ThingService(httpService);
    const styleService = new StyleService();
    const router = new Router();
    const listController = new ListController(router, thingService, styleService);
    listController.initView();
  };
};

// wait until scripts have been loaded
document.addEventListener("DOMContentLoaded", ListBootstrapper.start);
