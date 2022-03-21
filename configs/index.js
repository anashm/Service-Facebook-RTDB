const { join } = require("path");
const env = require("dotenv");

env.config({ path: join(__dirname, "..", ".env") });

module.exports = {
  PORT: process.env.PORT || 3000,
  CENTRIFUGE: {
    key: process.env.CENTRIFUGE_KEY,
    url: process.env.CENTRIFUGE_URL,
  },
  //   PUBLIC_URL: process.env.PUBLIC_URL,

  //   ASSETS_BASE: process.env.ASSETS_BASE,

  //   PASSWORD: process.env.PASSWORD,

  //   whatsapp: {
  //     BASE_URL: process.env.WHATSAPP_BASE_URL,
  //     callbackURL: process.env.PUBLIC_URL + '/callback',
  //   },

  //   mongo: {
  //     uri: `mongodb://${ process.env.MONGO_HOST }/${ process.env.MONGO_DB }`,
  //   }
};
