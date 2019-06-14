import { Router } from "./util/router.js";

class Bootstrapper {
  static start() {
    const router = new Router();
    router.navigateToListView();
  }
}

// wait until scripts have been loaded
document.addEventListener("DOMContentLoaded", Bootstrapper.start);
