const { Client } = require("pg");
require("dotenv").config();

//ansluta till databas
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false, 
    },
});

client.connect((err) => {
    if(err) {
        console.log("Fel vid anslutning:" + err);
    } else {
        console.log("Ansluten till databas");
    }
});

//skapar tabell för workexperience
client.query(`
    DROP TABLE IF EXISTS workexperience;
    CREATE TABLE workexperience (
    id SERIAL PRIMARY KEY,
    companyname VARCHAR(200) NOT NULL,
    jobtitle VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    startdate DATE NOT NULL,
    enddate DATE NOT NULL,
    description TEXT NOT NULL
    );`, (error, results) => {
        if (error) throw error;
        console.log('Tabellen är skapad')
    }
);
