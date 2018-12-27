const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/posts/";

const sequelize = require("../../src/db/models/index").sequelize;
const Space = require("../../src/db/models").Space;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("routes : posts", () => {

  beforeEach((done) => {
       this.space;
       this.post;
       this.user;

       sequelize.sync({force: true}).then((res) => {
         User.create({
           email: "starman@tesla.com",
           password: "Trekkie4lyfe"
         })
         .then((user) => {
           this.user = user;

           Space.create({
             title: "Winter Games",
             description: "Post your Winter Games stories.",
             posts: [{
               title: "Snowball Fighting",
               body: "So much snow!",
               userId: this.user.id
             }]
           }, {
             include: {
              model: Post,
              as: "posts"
             }
           })
           .then((space) => {
             this.space = space;
             this.post = space.posts[0];
             done();
           })
         })
       });

     });

     describe("member user performing CRUD actions for Post", () => {

 // #4: Send mock request and authenticate as a member user
     beforeEach((done) => {
       request.get({
         url: "http://localhost:3000/auth/fake",
         form: {
           role: "member"
         }
       });
           done();
         }
       );

  describe("GET /spaces/:spaceId/posts/new", () => {

    it("should render a new post form", () => {
      request.get(`${base}/${Space.id}/posts/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Post");
        done();
      });
    });

  });


 describe("POST /spaces/:spaceId/posts/create", () => {

   it("should create a new post and redirect", () => {
      const options = {
        url: `${base}/${this.space.id}/posts/create`,
        form: {
          title: "Watching snow melt",
          body: "Without a doubt my favoriting things to do besides watching paint dry!"
        }
      };
      request.post(options,
        (err, res, body) => {

          Post.findOne({where: {title: "Watching snow melt"}})
          .then((post) => {
            expect(post).not.toBeNull();
            expect(post.title).toBe("Watching snow melt");
            expect(post.body).toBe("Without a doubt my favoriting things to do besides watching paint dry!");
            expect(post.spaceId).not.toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });

 });

     describe("admin user performing CRUD actions for Post", () => {

// #2: // before each test in admin user context, send an authentication request
       // to a route we will create to mock an authentication request
     beforeEach((done) => {
       User.create({
         email: "admin@example.com",
         password: "123456",
         role: "admin"
       })
       .then((user) => {
         request.get({         // mock authentication
           url: "http://localhost:3000/auth/fake",
           form: {
             role: user.role,     // mock authenticate as admin user
             userId: user.id,
             email: user.email
           }
         },
           (err, res, body) => {
             done();
           }
         );
       });
     });

     describe("GET /spaces/:spaceId/posts/new", () => {

       it("should render a new post form", () => {
         request.get(`${base}/${Space.id}/posts/new`, (err, res, body) => {
           expect(err).toBeNull();
           expect(body).toContain("New Post");
           done();
         });
       });

     });


    describe("POST /spaces/:spaceId/posts/create", () => {

      it("should create a new post and redirect", () => {
         const options = {
           url: `${base}/${this.space.id}/posts/create`,
           form: {
             title: "Watching snow melt",
             body: "Without a doubt my favoriting things to do besides watching paint dry!"
           }
         };
         request.post(options,
           (err, res, body) => {

             Post.findOne({where: {title: "Watching snow melt"}})
             .then((post) => {
               expect(post).not.toBeNull();
               expect(post.title).toBe("Watching snow melt");
               expect(post.body).toBe("Without a doubt my favoriting things to do besides watching paint dry!");
               expect(post.spaceId).not.toBeNull();
               done();
             })
             .catch((err) => {
               console.log(err);
               done();
             });
           }
         );
       });

    });


     describe("GET /spaces/:spaceId/posts/:id", () => {

         it("should render a view with the selected post", () => {
           request.get(`${base}/${this.space.id}/posts/${this.post.id}`, (err, res, body) => {
             expect(err).toBeNull();
             expect(body).toContain("Snowball Fighting");
             done();
           });
         });

       });

       describe("POST /spaces/:spaceId/posts/:id/destroy", () => {

          it("should delete the post with the associated ID", () => {

            expect(this.post.id).toBe(1);

            request.post(`${base}/${this.space.id}/posts/${this.post.id}/destroy`, (err, res, body) => {

              Post.findById(1)
              .then((post) => {
                expect(err).toBeNull();
                expect(post).toBeNull();
                done();
              });


          });

        });
        });



       describe("GET /spaces/:spaceId/posts/:id/edit", () => {

         it("should render a view with an edit post form", () => {
           request.get(`${base}/${this.space.id}/posts/${this.post.id}/edit`, (err, res, body) => {
             expect(err).toBeNull();
             expect(body).toContain("Edit Post");
             expect(body).toContain("Snowball Fighting");
             done();
           });
         });

       });

       describe("POST /spaces/:spaceId/posts/:id/update", () => {

           it("should return a status code 302", () => {
             request.post({
               url: `${base}/${this.space.id}/posts/${this.post.id}/update`,
               form: {
                 title: "Snowman Building Competition",
                 body: "I love watching them melt slowly."
               }
             }, (err, res, body) => {
               expect(res.statusCode).toBe(302);
               done();
             });
           });

           it("should update the post with the given values", () => {
               const options = {
                 url: `${base}/${this.space.id}/posts/${this.post.id}/update`,
                 form: {
                   title: "Snowman Building Competition"
                 }
               };
               request.post(options,
                 (err, res, body) => {

                 expect(err).toBeNull();

                 Post.findOne({
                   where: {id: this.post.id}
                 })
                 .then((post) => {
                   expect(post.title).toBe("Snowman Building Competition");
                   done();
                 });
               });
           });

         });


         it("should not create a new post that fails validations", () => {
           const options = {
             url: `${base}/${this.space.id}/posts/create`,
             form: {

               title: "a",
               body: "b"
             }
           };

           request.post(options,
             (err, res, body) => {

               Post.findOne({where: {title: "a"}})
               .then((post) => {
                   expect(post).toBeNull();
                   done();
               })
               .catch((err) => {

                 done();
               });
             }
           );
         });
        });
      });
    });
