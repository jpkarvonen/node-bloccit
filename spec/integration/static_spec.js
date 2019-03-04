const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

  describe("GET /", () => {

    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });

  describe("GET /marco", () => {
    let url = "http://localhost:3000/marco"

    it("should return status code 200", (done) => {
      request.get(url, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    it("body should return 'polo'", (done) => {
      request.get(url, (err, res, body) => {
        expect(body).toBe("polo");
        done();
      });
    });

  });

});
