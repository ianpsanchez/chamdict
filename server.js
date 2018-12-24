// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var path = require("path");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "app")));

// Database configuration
// Save the URL of our database as well as the name of our collection
// var databaseUrl = "ChamorroDB";
var databaseUrl = "mongodb://heroku_kxtrq3f6:5aq3m3e6mdo42iqdlu22il3mao@ds117431.mlab.com:17431/heroku_kxtrq3f6";
var collections = ["tiningo"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function (error) {
  console.log("Database Error:", error);
});

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

// require("./app/routing/apiRoutes")(app);
// require("./app/routing/htmlRoutes")(app);

app.get("/", function (req, res) {
  // res.send("the Root");
  res.sendFile(path.join(__dirname, "./app/index.html"));

});

// 2. At the "/all" path, display every entry in the animals collection

app.get("/all", function (req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  console.log("--> REQ-QUERY-GRINO: " + req.query.grino);
  // db.tiningo.find({}, function(err, found) {
  db.tiningo.find({ grino: { $regex: "^" + req.query.grino + "$", $options: "i" } }, function (err, found) {
    // Log any errors if the server encounters one
    if (err) {
      console.log("Error: " + err);
    }
    // Otherwise, send the result of this query to the browser
    else {
      console.log("--> FOUND: --> " + JSON.stringify(found));
      res.json(found);
      if (JSON.stringify(found) === "[]") {
        db.inwords.insert({ inword: req.query.grino });
      }
    }
  });

});

// app.get("/survey", function (req, res) {
//     res.send("survey form route");
// });

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "app/public/home.html"));
// });

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});