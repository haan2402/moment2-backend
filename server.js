const express = require('express');
const dbClient = require('./install');
const cors = require('cors');
require('dotenv').config();

const app = express();  //instans express
const port = process.env.PORT || 3000; //port

app.use(cors()); //för att aktivera cors
app.use(express.json()); //tolkar JSON

//skapar routing med get
app.get("/workexperience", (req, res) => {
    dbClient.query('SELECT * FROM workexperience', (error, results) => {

        if(error) {
            console.error("error with connection", error);
           return res.status(500).json({message: "Error, try again later"});
        }
        console.log("result:", results.rows);
        res.json(results.rows);
    });
});

//Lägger till ny erfarenhet med post
app.post("/workexperience", (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    if(!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        return res.status(400).json({message: "All fields are required to fill in!"});
    }
    dbClient.query('INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', 
        [companyname, jobtitle, location, startdate, enddate, description], (error, results) => {
            if(error) {
                res.status(500).json({message: "Error, try again later"});
            } else {
                res.status(201).json({message: "Workexperience added!", id:results.rows[0].id});
            }
        });
});

//Uppdaterar erfarenhet efter ID med put
app.put("/workexperience/:id", (req, res) => {
    const experienceId = req.params.id;
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    if(!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        return res.status(400).json({message: "All fields are required to fill in!"});
    }
    dbClient.query('UPDATE workexperience SET companyname = $1, jobtitle = $2, location = $3, startdate = $4, enddate = $5, description = $6  WHERE id = $7',
        [companyname, jobtitle, location, startdate, enddate, description, experienceId], (error, results) => {
            if(error) {
                res.status(500).json({message: "Error, try again later"});
            } else {
                res.status(200).json({message: "Workexperience updated!"});
            }
    });
});

//tar bort en erfarenhet med hjälp av delete
app.delete("/workexperience/:id", (req, res) => {
    const experienceId = req.params.id;
    
    dbClient.query('DELETE FROM workexperience WHERE id = $1', [experienceId],(error, results) => {
        if(error) {
            res.status(500).json({message: "Error, try again later"});
        } else {
            res.status(200).json({message: "Workexperience deleted!"});
        }
    }); 
});


app.listen(port, () => {
    console.log("Started on port: " + port);
});