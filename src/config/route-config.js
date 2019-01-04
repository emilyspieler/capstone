module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const spaceRoutes = require("../routes/spaces");
    const userRoutes = require("../routes/users");
    const postRoutes = require("../routes/posts");
    const commentRoutes = require("../routes/comments");
    const flagRoutes = require("../routes/flags");


    if(process.env.NODE_ENV === "test") {
     const mockAuth = require("../../spec/support/mock-auth.js");
     mockAuth.fakeIt(app);
   }

    app.use(staticRoutes);
    app.use(spaceRoutes);
    app.use(userRoutes);
    app.use(postRoutes);
    app.use(commentRoutes);
    app.use(flagRoutes);
  }
}
