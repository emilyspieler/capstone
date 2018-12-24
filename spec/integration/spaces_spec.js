const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/spaces/";

const sequelize = require("../../src/db/models/index").sequelize;
const Space = require("../../src/db/models").Space;

describe("routes : spaces", () => {

  beforeEach((done) => {
      this.space;
      sequelize.sync({force: true}).then((res) => {

       Space.create({
         title: "JS Frameworks",
         description: "There is a lot of them"
       })
        .then((space) => {
          this.space = space;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

      });

    });

   describe("GET /spaces", () => {

     it("should return a status code 200 and all spaces", () => {

       request.get(base, (err, res, body) => {
         expect(res.statusCode).toBe(200);
         expect(err).toBeNull();
         expect(body).toContain("Spaces");
         expect(body).toContain("JS Frameworks");
         done();
       });
     });
   });

   describe("GET /spaces/new", () => {

    it("should render a new space form", () => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Space");
        done();
      });
    });

  });

  describe("POST /spaces/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }
      };

      it("should create a new space and redirect", () => {

//#1
        request.post(options,

//#2
          (err, res, body) => {
            Space.findOne({where: {title: "blink-182 songs"}})
            .then((space) => {
              expect(res.statusCode).toBe(303);
              expect(space.title).toBe("blink-182 songs");
              expect(space.description).toBe("What's your favorite blink-182 song?");
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

    describe("GET /spaces/:id", () => {

         it("should render a view with the selected space", () => {
           request.get(`${base}${this.space.id}`, (err, res, body) => {
             expect(err).toBeNull();
             expect(body).toContain("JS Frameworks");
             done();
           });
         });

       });

       describe("POST /spaces/:id/destroy", () => {

        it("should delete the space with the associated ID", () => {

          Space.all()
          .then((spaces) => {

            const spaceCountBeforeDelete = spaces.length;

            expect(spaceCountBeforeDelete).toBe(1);

            request.post(`${base}${this.space.id}/destroy`, (err, res, body) => {
              Space.all()
              .then((spaces) => {
                expect(err).toBeNull();
                expect(spaces.length).toBe(spaceCountBeforeDelete - 1);
                done();
              })

            });
          });

        });

      });

      describe("GET /spaces/:id/edit", () => {

     it("should render a view with an edit space form", () => {
       request.get(`${base}${this.space.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Space");
         expect(body).toContain("JS Frameworks");
         done();
       });
     });

   });

   describe("POST /spaces/:id/update", () => {

     it("should update the space with the given values", () => {
        const options = {
           url: `${base}${this.space.id}/update`,
           form: {
             title: "JavaScript Frameworks",
             description: "There are a lot of them"
           }
         };
//#1
         request.post(options,
           (err, res, body) => {

           expect(err).toBeNull();
//#2
           Space.findOne({
             where: { id: this.space.id }
           })
           .then((space) => {
             expect(space.title).toBe("JavaScript Frameworks");
             done();
           });
         });
     });

   });

});
