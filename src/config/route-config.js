module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const spaceRoutes = require("../routes/spaces");
    const userRoutes = require("../routes/users");
    app.use(staticRoutes);
    app.use(spaceRoutes);
    app.use(userRoutes);
  }
}
