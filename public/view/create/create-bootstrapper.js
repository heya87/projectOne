import { ThingService } from "../../service/thing-service.js";
import { CreateController } from "./create-controller.js";
import { Router } from "../../util/router.js";
import { StyleService } from "../../util/style-service.js";
import { HttpService } from "../../service/http-service.js";

class CreateBootstrapper {
  static start() {
    const httpService = new HttpService()
    const thingService = new ThingService(httpService);
    const styleService = new StyleService();
    const router = new Router();
    const createController = new CreateController(router, thingService, styleService);
    createController.initView();
  };
};

// wait until scripts have been loaded
document.addEventListener("DOMContentLoaded", CreateBootstrapper.start);
