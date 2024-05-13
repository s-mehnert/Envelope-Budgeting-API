const express = require("express");
const app = express();

const envelopes = [
    {"total" : {"budget" : 5000, "spent" : 0}},
    {"groceries" : {"budet" : 1000, "spent" : 0}},
    {"rent & utilities" : {"budget" : 2000, "spent" : 0}},
    {"clothing" : {"budget" : 200, "spent" : 0}}
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.send("<h1>Hello, World!</h1>");
});

app.get("/envelopes", (req, res, next) => {
    console.log(envelopes);
    res.json(envelopes);
});

app.get("/envelopes/:name", (req, res, next) => {
    console.log(req.params);
    console.log(envelopes[req.params.name])
    res.send(envelopes[req.params.name]);
});

app.post("/envelopes", (req, res, next) => {
    const name = req.body.name;
    console.log(name);
    const budget = req.body.budget;
    console.log(budget);
    const envelope = {name : {"budget" : budget, "spent" : 0}};
    envelopes.push(envelope)

    res.send(envelopes.name);
});

app.listen(3000, () => {
    console.log("Server listening on port 3000...");
});