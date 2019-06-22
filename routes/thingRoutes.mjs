export class ThingRoutes {
  constructor(router, thingService) {
    this.router = router;
    this.thingService = thingService;
  }

  getRoutes() {
    this.router.get("/", this.thingService.getThings.bind(this.thingService));
    this.router.post("/", this.thingService.createThing.bind(this.thingService));
    this.router.put("/:id", this.thingService.createThing.bind(this.thingService));
    this.router.get("/:id/", this.thingService.getThing.bind(this.thingService));
    this.router.delete("/:id/", this.thingService.deleteThing.bind(this.thingService));
    return this.router;
  }
}
