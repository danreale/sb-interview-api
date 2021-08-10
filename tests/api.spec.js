const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../app");

chai.use(chaiHttp);
const appServer = chai.request(server).keepOpen();

let issue_id;

describe("API Tests", () => {
  after(() => {
    appServer.close();
  });
  it("Health Check", (done) => {
    appServer.get("/api/v1/health").end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.eql("API Is Running");
      done();
    });
  });
  it("Get All Issues", (done) => {
    appServer.get("/api/v1/issues").end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length.gte(1);
      done();
    });
  });
  it("Get All General Issues", (done) => {
    appServer.get("/api/v1/issues?category=General").end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.lengthOf(1);
      done();
    });
  });
  it("Get All Open Issues", (done) => {
    appServer.get("/api/v1/issues?status=Open").end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.lengthOf(1);
      done();
    });
  });
  it("Get All General Open Issues", (done) => {
    appServer
      .get("/api/v1/issues?category=General&status=Open")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(1);
        done();
      });
  });
  it("Get Specific Issue", (done) => {
    appServer.get("/api/v1/issues/34").end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0].snowids).to.eql(["1", "2", "3"]);
      expect(res.body[0].date_reported).to.eql("2021-07-09T05:01:55+00:00");
      expect(res.body[0].status).to.eql("Open");
      expect(res.body[0].category).to.eql("General");
      expect(res.body[0].description).to.eql(
        "User Information, such as email address and last name, on the My Profile page cannot be updated. User has already updated Profile information in HARP."
      );
      expect(res.body[0].date_resolved).to.eql("2021-07-09T05:01:55+00:00");
      expect(res.body[0].provider_types).to.eql(["HHA", "IRF", "LTCH"]);
      done();
    });
  });
  it("Add New Issue", (done) => {
    appServer
      .post("/api/v1/issues")
      .send({
        snowids: ["222", "333", "444"],
        date_reported: "2021-06-21",
        status: "Open",
        category: "Survey And Certification",
        description: "This is an API test.",
        date_resolved: null,
        provider_types: ["HHA", "IRF", "LTCH"],
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        issue_id = res.body[0].id;
        expect(res.body[0].snowids).to.eql(["222", "333", "444"]);
        expect(res.body[0].date_reported).to.eql("2021-06-21T00:00:00+00:00");
        expect(res.body[0].status).to.eql("Open");
        expect(res.body[0].category).to.eql("Survey And Certification");
        expect(res.body[0].description).to.eql("This is an API test.");
        expect(res.body[0].date_resolved).to.eql(null);
        expect(res.body[0].provider_types).to.eql(["HHA", "IRF", "LTCH"]);
        done();
      });
  });
  it("Update Issue", (done) => {
    appServer
      .put(`/api/v1/issues/${issue_id}`)
      .send({
        snowids: ["222", "333", "444"],
        date_reported: "2021-06-21",
        status: "Resolved",
        category: "Survey And Certification",
        description: "This is an API test.",
        date_resolved: "2021-06-25",
        provider_types: ["HHA", "IRF", "LTCH"],
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body[0].snowids).to.eql(["222", "333", "444"]);
        expect(res.body[0].date_reported).to.eql("2021-06-21T00:00:00+00:00");
        expect(res.body[0].category).to.eql("Survey And Certification");
        expect(res.body[0].description).to.eql("This is an API test.");
        expect(res.body[0].provider_types).to.eql(["HHA", "IRF", "LTCH"]);
        expect(res.body[0].status).to.eql("Resolved");
        expect(res.body[0].date_resolved).to.eql("2021-06-25T00:00:00+00:00");
        expect(res.body[0].id).to.eql(issue_id);
        done();
      });
  });
});
