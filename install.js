const { Client } = require("pg");
require("dotenv").config();

//ansluta till databas
const dbClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false, 
    },
});

dbClient.connect((err) => {
    if(err) {
        console.log("Fel vid anslutning:" + err);
    } else {
        console.log("Ansluten till databas");
    }
});

//skapar tabell för workexperience
dbClient.query(`
    DROP TABLE IF EXISTS workexperience;
    CREATE TABLE workexperience (
    id SERIAL PRIMARY KEY,
    companyname VARCHAR(200) NOT NULL,
    jobtitle VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    startdate DATE NOT NULL,
    enddate DATE NOT NULL,
    description TEXT NOT NULL
    );`, (error) => {
        if (error) {
            console.error("Fel när tabell skapas", error);
            dbClient.end();
            return;
        }
        console.log('Tabellen är skapad')

        //lägger in test-data
    dbClient.query('INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES ($1, $2, $3, $4, $5, $6)',
        ["Stora Coop", "Deli-disk", "Kalix", '2016-05-20', '2020-08-30', "Sålde chark, ost och färdig mat från delikatessdisken"],
        (error) => {
            if (error) {
                console.error("Fel vid inmatning..", error);
            } else {
                console.log("Ny erfarenhet lagt till!");
            }
    }
);
});

//exporterar dbClient till server.js filen
module.exports = dbClient;