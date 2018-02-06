const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});
console.log("Searching...");

const dbQuery = process.argv[2];

client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    client.query("SELECT * FROM famous_people WHERE last_name = $1::text OR first_name = $1::text", [dbQuery], (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }
        console.log("Found " + ((result.rows.length)) + " person(s) by the name " + dbQuery + ":");
        for (const row of result.rows) {
            const dateFull = new Date(row.birthdate);
            const year = dateFull.getFullYear();
            const month = dateFull.getMonth() + 1;
            const day = dateFull.getDate() + 1;
            const date = (year + "-" + month + "-" + day);
            console.log(" - " + (row.id) + ": " + (row.first_name) + " " + (row.last_name) + ", born \'" + (date) + "\'");
        }; 
        client.end();
    });
});