/* express config */
const PORT = 3000;
const FRONTENDPORT = 4200;
const express = require('express');
const app = express();
var cors = require('cors')
/* db config */
var db = require('./db.js')
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json("Content-Type: application/json"));

app.use(cors())
/* Server */
app.listen(PORT, () =>
{
    console.log(`Creditus Challenge API listening on port ${PORT}`);
})

/* Base URL */
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${FRONTENDPORT}`);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


/* Endpoints */
app.get("/api/posts", (req, res, next) => {
    console.log('get request')
    var sql = "select * from post ORDER BY id DESC"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/api/posts", (req, res, next) => {
    var errors=[]
    console.log(req.body)
    if (!req.body.title){
        errors.push("No title specified");
    }
    if (!req.body.content){
        errors.push("No content specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(", ")});
        return;
    }
    var data = {
        title: req.body.title,
        content: req.body.content,
        createdAt : req.body.createdAt
    }
    var sql ='INSERT INTO post (title, content, createdAt) VALUES (?,?,?)'
    var params =[data.title, data.content, data.createdAt]
    
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});


/* Default response for undeclared request */
app.use(function(req, res){
    
    res.status(404);
});