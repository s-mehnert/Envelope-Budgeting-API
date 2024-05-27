const express = require("express");
const app = express();

const envelopes = {
    "groceries" : {"budget" : 1000},
    "rent & utilities" : {"budget" : 2000},
    "clothing" : {"budget" : 200}
};

const total = 5000;
let spent = 0;

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
    console.log(req.params.name);
    console.log(envelopes[req.params.name])
    res.send(envelopes[req.params.name]);
});

app.post("/envelopes", (req, res, next) => {
    const name = req.body.name;
    console.log(name);
    const budget = req.body.budget;
    console.log(budget);
    const envelope = {"budget" : budget, "spent" : 0};
    envelopes[name] = envelope;
    res.status(201).send(envelopes[name]);
});

app.put("/envelopes/:name", (req, res, next) => {
    console.log(req.params);
    const envelope = req.params.name;
    const spending = req.query.spent;
    if (envelopes[envelope].budget - spending >= 0) {
        envelopes[envelope].budget -= spending;
        res.send(envelopes[envelope]);
    } else {
        res.status(403).send("Operation declined. Spending exceeds remaining budget.");
    }
});

app.listen(3000, () => {
    console.log("Server listening on port 3000...");
});