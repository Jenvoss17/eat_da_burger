var express = require("express");

// var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

module.exports = function (app) {
    // Create all our routes and set up logic within those routes where required.
    app.get("/burgers", function (req, res) {
        burger.selectAll(function (data) {
            var hbsObject = {
                burgers: data
            };
            res.render("index", hbsObject);
        });
    });

    app.post("/burgers/insertOne", function (req, res) {
        burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, false], function (result) {
            res.redirect("/burgers");
        });
    });

    app.put("/burgers/updateOne/:id", function (req, res) {
        var condition = "id = " + req.params.id;
        console.log("condition", condition);

        burger.updateOne(
            {
                devoured: req.body.devoured
            },
            condition,
            function (result) {
                console.log('controller')
                console.log(result);
                if (result.changedRows === 0) {
                    // If no rows were changed, then the ID must not exist, so 404
                    return res.status(404).end();
                }
                res.redirect("/burgers");
            }
        );
    });
}
