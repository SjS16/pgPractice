// Update with your config settings.
const settings = require("./settings"); // settings.json

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: settings.hostname,
      user: settings.user,
      password: settings.password,
      database: settings.database
    }
  }

};
