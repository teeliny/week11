import app from "../../app";
import mongoose from "mongoose";
import supertest from "supertest";

const request = supertest(app);

beforeAll(done => {
  done()
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
})
describe("Test all routes", () => {
  it("Test Status code for Correct Query", async () => {
    try {
      const response = request("/graphql")
        .post("/graphql")
        .send({ query: "{allOrganization{ceo}}" })
        .expect(200);
    } catch (error) {
      console.log(`error ${error.toString()}`);
    }
  });

  it("Test Status code for Wrong Query", async () => {
    try {
      const response = request("/graphql")
        .post("/graphql")
        .send({ query: "{allOrganization{cu}}" })
        .expect(400);
    } catch (error) {
      console.log(`error ${error.toString()}`);
    }
  });

  it("Get all existing users in the database", async (done) => {
    request
      .post("/graphql")
      .send({ query: "{allUser{email}}" })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        expect(res.body).toBeInstanceOf(Object);
        done();
      });
  });

  it("Add new User", async (done) => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation{addUser(first_name: "Mitchel", last_name: "Obi", user_name: "rivers", user_password: "123456", email: "mitchelobi@gmail.com") { id first_name email }}',
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        let val = res.body.data.addUser;
        expect(val).toHaveProperty("first_name", "Mitchel")
        expect(val).toHaveProperty("email", "mitchelobi@gmail.com");
        done();
      });
  });

  it("Sign in An Existing User", async (done) => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation{signIn(user_password: "123456", email: "mitchelobi@gmail.com") { id first_name email }}',
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        let val = res.body.data.signIn;
        expect(val).toHaveProperty("first_name", "Mitchel")
        expect(val).toHaveProperty("email", "mitchelobi@gmail.com");
        done();
      });
  });

  it("Delete an Existing User", async (done) => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation{deleteUser(email: "mitchelobi@gmail.com") { id first_name email }}',
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        let val = res.body.data.deleteUser;
        expect(val).toHaveProperty("first_name", "Mitchel")
        expect(val).toHaveProperty("email", "mitchelobi@gmail.com");
        done();
      });
  });

  it("Gets all organizations", async (done) => {
    request
      .post("/graphql")
      .send({ query: "{allOrganization{ceo}}" })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        expect(res.body).toBeInstanceOf(Object);
        done();
      });
  });

  it("Returns organization with id = 5f6bb846a3a37f00218dc9b6", async (done) => {
    request
      .post("/graphql")
      .send({
        query:
          "{ oneOrganization(id: \"5f6bb846a3a37f00218dc9b6\") { organization address country } }",
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        let val = res.body.data.oneOrganization;
        expect(val).toHaveProperty("country", "Lagos NG")
        expect(val).toHaveProperty("organization", "Decagon2");
        done();
      });
  });

  it("Add new Organization", async (done) => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation{addOrganization(organization: "Decagon2227", ceo: "James", country: "Germany", market_value: "85%", employees: ["base1", "ment1"], products: ["once", "twice", "thrice"], address: "Abeokuta") { id organization ceo country }}',
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        let val = res.body.data.addOrganization;
        expect(val).toHaveProperty("ceo", "James")
        expect(val).toHaveProperty("country", "Germany");
        done();
      });
  });

  it("Update Organization", async (done) => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation{updateOrganization(organization: "Decagon2227", ceo: "John", country: "Nigeria", employees: ["base1", "ment1"], address: "Lagos") { ceo country }}',
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        let val = res.body.data.updateOrganization;
        expect(val).toHaveProperty("ceo", "John")
        expect(val).toHaveProperty("country", "Nigeria")
        done();
      });
  });

  it("Delete Organization", async (done) => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation{deleteOrganization(organization: "Decagon2227") { id organization ceo country }}',
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        let val = res.body.data.deleteOrganization;
        expect(val).toHaveProperty("organization", "Decagon2227")
        done();
      });
  });
});
