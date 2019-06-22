import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { ThingRoutes } from "./routes/thingRoutes";
import { ThingService } from "./services/thingService";
import { ThingStore } from "./persistence/thingStore";
import { DateUtil } from "./util/dateUtil.mjs";

const app = express();
const router = express.Router();

app.use("/", express.static(path.resolve("public")));
app.use(bodyParser.json());

let dateUtil = new DateUtil();
let thingStore = new ThingStore();
let thingService = new ThingService(dateUtil, thingStore);
let thingRoutes = new ThingRoutes(router, thingService);

app.use("/thing", thingRoutes.getRoutes());

const hostname = "127.0.0.1";
const port = 3001;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
