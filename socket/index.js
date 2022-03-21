const socket_io = require("socket.io");
var io = socket_io();
const { Pages, Posts, Comments } = require("../models");
const configs = require("../configs");
const streamPage = Pages.watch();
const streamPosts = Posts.watch();
const streamComments = Comments.watch();
const centrifuge = require("sdk-centrifuge");

centrifuge.init(configs.CENTRIFUGE.url, configs.CENTRIFUGE.key);

exports.start = () => {
  streamPage.on("change", (changedPage) => {
    if (
      changedPage.operationType == "update" &&
      Object.keys(changedPage.updateDescription.updatedFields).length > 1 &&
      !changedPage.updateDescription.updatedFields.posts
    ) {
      Pages.findById(changedPage.documentKey).then((page) => {
        const channel = `notifications:facebook:${page.id}`;
        return centrifuge.publish(channel, {
          object: "facebook_page",
          data: page,
        });
      });
    } else if (changedPage.operationType == "insert") {
      const channel = `notifications:facebook:${changedPage.fullDocument.id}`;
      return centrifuge.publish(channel, {
        object: "facebook_page",
        data: changedPage.fullDocument,
      });
    }
  });

  streamPosts.on("change", (changedPost) => {
    if (
      changedPost.operationType == "update" &&
      Object.keys(changedPost.updateDescription.updatedFields).length > 1 &&
      !changedPost.updateDescription.updatedFields.comments
    ) {
      Posts.findById(changedPost.documentKey).then((post) => {
        const channel = `notifications:facebook:${post.page_id}`;
        return centrifuge.publish(channel, {
          object: "facebook_posts",
          data: post,
        });
      });
    } else if (changedPost.operationType == "insert") {
      const channel = `notifications:facebook:${changedPost.fullDocument.page_id}`;
      return centrifuge.publish(channel, {
        object: "facebook_posts",
        data: changedPost.fullDocument,
      });
    }
  });

  streamComments.on("change", (changedComment) => {
    if (
      changedComment.operationType == "update" &&
      Object.keys(changedComment.updateDescription.updatedFields).length > 1
    ) {
      Comments.findById(changedComment.documentKey).then((comment) => {
        const channel = `notifications:facebook:${comment.page_id}`;
        return centrifuge.publish(channel, {
          object: "facebook_comments",
          data: comment,
        });
      });
    } else if (changedComment.operationType == "insert") {
      const channel = `notifications:facebook:${changedComment.fullDocument.page_id}`;
      return centrifuge.publish(channel, {
        object: "facebook_comments",
        data: changedComment.fullDocument,
      });
    }
  });

  io.on("connection", function () {
    console.log("connected");
  });
};

// var socket = io;
// module.exports = socket;
