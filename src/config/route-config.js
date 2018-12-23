module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const spaceRoutes = require("../routes/spaces");
    app.use(staticRoutes);
    app.use(spaceRoutes);
  }
}
