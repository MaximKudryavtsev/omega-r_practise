var express = require("express");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;

var app = express();
var jsonParser = bodyParser.json();
var url = "mongodb://localhost:27017/shapes";

app.use(express.static(__dirname + "/"));
app.get("/api/shapes", function(req, res){

    mongoClient.connect(url, function(err, db){
        db.collection("shapes").find({}).toArray(function(err, shapes){
            res.send(shapes);
            db.close();
        });
    });
});
app.get("/api/shapes/:id", function(req, res){

    var id = new objectId(req.params.id);
    mongoClient.connect(url, function(err, db){
        db.collection("shapes").findOne({_id: id}, function(err, shape){
            if(err) return res.status(400).send();
            res.send(shape);
            db.close();
        });
    });
});

app.post("/api/shapes", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);
    var shapeType = req.body.shapeType;
    var shape = chooseShape(shapeType, req);
    mongoClient.connect(url, function(err, db){
        db.collection("shapes").insertOne(shape, function(err, result){
            if(err) return res.status(400).send();
            res.send(shape);
            db.close();
        });
    });
});

app.delete("/api/shapes/:id", function(req, res){

    var id = new objectId(req.params.id);
    mongoClient.connect(url, function(err, db){
        db.collection("shapes").findOneAndDelete({_id: id}, function(err, result){

            if(err) return res.status(400).send();

            var shape = result.value;
            res.send(shape);
            db.close();
        });
    });
});

function chooseShape(shapeType, req){
    var fillColor = req.body.fillColor;
    var borderColor= req.body.borderColor;
    var shape;
    console.log(shapeType);
    if (shapeType == "circle") {
        var circleX = req.body.circleX;
        var circleY = req.body.circleY;
        var radius = req.body.radius;
        shape = {
            fillColor: fillColor,
            borderColor: borderColor,
            circleX: circleX,
            circleY: circleY,
            radius: radius,
            shapeType: shapeType
        };
        return shape;
    }
    else if (shapeType == "rectangle") {
        var rectangleX1 = req.body.rectangleX1;
        var rectangleY1 = req.body.rectangleY1;
        var rectangleX2 = req.body.rectangleX2;
        var rectangleY2 = req.body.rectangleY2;
        shape = {
            fillColor: fillColor,
            borderColor: borderColor,
            rectangleX1: rectangleX1,
            rectangleY1: rectangleY1,
            rectangleX2: rectangleX2,
            rectangleY2: rectangleY2,
            shapeType: shapeType
        };
        return shape;
    }
    else if (shapeType == "triangle") {
        var triangleX1 = req.body.triangleX1;
        var triangleY1 = req.body.triangleY1;
        var triangleX2 = req.body.triangleX2;
        var triangleY2 = req.body.triangleY2;
        var triangleX3 = req.body.triangleX3;
        var triangleY3 = req.body.triangleY3;
        shape = {
            fillColor: fillColor,
            borderColor: borderColor,
            triangleX1: triangleX1,
            triangleY1: triangleY1,
            triangleX2: triangleX2,
            triangleY2: triangleY2,
            triangleX3: triangleX3,
            triangleY3: triangleY3,
            shapeType: shapeType
        };
        return shape;
    }

}

app.listen(3000, function(){
    console.log("Server is working...");
});