var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

var constr = "mongodb://127.0.0.1:27017";
var app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to API");
});

app.get("/users", (req, res) => {
  mongoClient.connect(constr).then((clientObj) => {
    var database = clientObj.db("taskdb");
    database
      .collection("users")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.get("/tasklist", (req, res) => {
  mongoClient.connect(constr).then((clientObj) => {
    var database = clientObj.db("taskdb");
    database
      .collection("tasklist")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.get("/tasklist/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoClient.connect(constr).then((clientObj) => {
    var database = clientObj.db("taskdb");
    database
      .collection("tasklist")
      .find({ taskid: id })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.post("/registeruser", (req, res) => {
  var user = {
    UserId: req.body.UserId,
    UserName: req.body.UserName,
    Password: req.body.Password,
  };

  mongoClient.connect(constr).then((clientObj) => {
    var database = clientObj.db("taskdb");
    database
      .collection("users")
      .insertOne(user)
      .then(() => {
        console.log(`User Inserted`);
        res.redirect("/users");
        res.end();
      });
  });
});

app.post("/addtasklist", (req, res) => {
  var task = {
    taskid: parseInt(req.body.taskid),
    Title: req.body.Title,
    Description: req.body.Description,
    Status: req.body.Status,
  };

  mongoClient.connect(constr).then((clientObj) => {
    var database = clientObj.db("taskdb");
    database
      .collection("tasklist")
      .insertOne(task)
      .then(() => {
        console.log(`Task Inserted`);
        res.redirect("/tasklist");
        res.end();
      });
  });
});

app.put("/updatetasklist/:id", (req, res) => {
  var id = parseInt(req.params.id);

  var task = {
    taskid: parseInt(req.body.taskid),
    Title: req.body.Title,
    Description: req.body.Description,
    Status: req.body.Status,
  };
  console.log(task);

  mongoClient.connect(constr).then((clientObj) => {
    var database = clientObj.db("taskdb");
    database
      .collection("tasklist")
      .updateOne({ taskid: id }, { $set: task })
      .then(() => {
        console.log(`Task Updated`);
        //  res.redirect("/tasklist");
        res.end();
      });
  });
});

app.delete("/deletetasklist/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoClient.connect(constr).then((clientObj) => {
    var database = clientObj.db("taskdb");
    database
      .collection("tasklist")
      .deleteOne({ taskid: id })
      .then(() => {
        console.log(`Video Deleted`);
        //  res.redirect("/tasklist");
        res.end();
      });
  });
});

app.listen(5000);
console.log(`Server Started : http://127.0.0.1:5000`);
