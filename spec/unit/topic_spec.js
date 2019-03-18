const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {

      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;

        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic;
          this.post = topic.posts[0];
          done();
        })
      })
    });
  });

  describe("#create()", () => {

    it("should create a topic object with a title and description", (done) => {
      Topic.create({
        title: "What's the Buzz?",
        description: "Tell me what's a happenin!"
      })
      .then((topic) => {
        expect(topic.title).toBe("What's the Buzz?");
        expect(topic.description).toBe("Tell me what's a happenin!");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic object with a missing description.", (done) => {
      Topic.create({
        title: "What's the Buzz?"
      })
      .then((topic) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      })
    });

  });

  describe("#getPosts()", () => {

    it("should return the associated post", (done) => {
      this.topic.getPosts()
      .then((associatedPost) => {
        expect(associatedPost[0].dataValues.title).toBe("My first visit to Proxima Centauri b");
        done();
      });
    });

  });

});
