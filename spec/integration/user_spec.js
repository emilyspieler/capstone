const User = require("../../src/db/models").User;
const base = "http://localhost:3000/users/";
const sequelize = require("../../src/db/models/index").sequelize;
const request = require("request");

describe("User", () => {

  beforeEach((done) => {
// #1
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("#create()", () => {

// #2
    it("should create a User object with a valid email and password", () => {
      User.create({
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {
        expect(user.email).toBe("user@example.com");
        expect(user.id).toBe(1);

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

// #3
    it("should not create a user with invalid email or password", () => {
      User.create({
        email: "It's-a me, Mario!",
        password: "1234567890"
      })
      .then((user) => {

        // The code in this block will not be evaluated since the validation error
        // will skip it. Instead, we'll catch the error in the catch block below
        // and set the expectations there.


      })
      .catch((err) => {
// #4
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

    it("should not create a user with an email already taken", () => {

// #5
      User.create({
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {

        User.create({
          email: "user@example.com",
          password: "nananananananananananananananana BATMAN!"
        })
        .then((user) => {

          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there

          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          done();
        });


      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("POST /users", () => {

// #1
    it("should create a new user with valid values and redirect", () => {

      const options = {
        url: base,
        form: {
          email: "user@example.com",
          password: "123456789"
        }
      }

      request.post(options,
        (err, res, body) => {

// #2
          User.findOne({where: {email: "user@example.com"}})
          .then((user) => {
            expect(user).not.toBeNull();
            expect(user.email).toBe("user@example.com");
            expect(user.id).toBe(1);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });

// #3
    it("should not create a new user with invalid attributes and redirect", () => {
      request.post(
        {
          url: base,
          form: {
            email: "no",
            password: "123456789"
          }
        },
        (err, res, body) => {
          User.findOne({where: {email: "no"}})
          .then((user) => {
            expect(user).toBeNull();
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

  describe("GET /users/sign_in", () => {

     it("should render a view with a sign in form", () => {
       request.get(`${base}sign_in`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Sign in");
         done();
       });
     });

   });

});
