const functions = require("firebase-functions");

exports.chat = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  if (request.method === "GET" || !request.body.message) {
    response.send("Hello! This function is meant to be used in a Google Chat Space.");
  }

  const sender = request.body.message.sender.displayName;
  const image = request.body.message.sender.avatarUrl;

  const data = createMessage(sender, image);

  response.send(data);
});

function createMessage(displayName, imageURL) {
  const cardHeader = {
    "title": "Hello " + displayName + "!",
  };

  const avatarWidget = {
    "textParagraph": { "text": "Your avatar picture: " },
  };

  const avatarImageWidget = {
    image: { "imageUrl": imageURL },
  };

  const avatarSection = {
    "widgets": [
      avatarWidget,
      avatarImageWidget,
    ],
  };

  return {
    "cards": [{
      "name": "Avatar Card",
      "header": cardHeader,
      "sections": [avatarSection],
    }],
  };
}