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

const dbQuery = process.argv[2];

knex.select('*')
.from('famous_people')
.where({first_name: dbQuery})
.orWhere({last_name: dbQuery})
.asCallback(function(err, rows) {
    if (err) {
        return console.error("error running query", err);
    }
    console.log("Found " + ((rows.length)) + " person(s) by the name " + dbQuery + ":");
    for (const row of rows) {
        const dateFull = new Date(row.birthdate);
        const year = dateFull.getFullYear();
        const month = dateFull.getMonth() + 1;
        const day = dateFull.getDate() + 1;
        const date = (year + "-" + month + "-" + day);
        console.log(" - " + (row.id) + ": " + (row.first_name) + " " + (row.last_name) + ", born \'" + (date) + "\'");
    }
});


