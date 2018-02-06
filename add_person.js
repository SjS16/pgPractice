const settings = require("./settings"); // settings.json
const pg = require("pg");

var knex = require('knex')({
    client: 'pg',
    connection: {
        host: settings.hostname,
        user: settings.user,
        password: settings.password,
        database: settings.database
    }
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const birth_date = process.argv[4];

knex.insert([{first_name: firstName,
last_name: lastName,
birthdate: birth_date}])
 .into('famous_people').then(function (result) {
     console.log("done")
 })

 knex.destroy();