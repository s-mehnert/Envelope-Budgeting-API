const express = require("express");
const app = express();

const envelopes = {
    // "groceries" : {"budget" : 1000},
    // "rent & utilities" : {"budget" : 2000},
    // "clothing" : {"budget" : 200}
};

let total = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.send(`Total budget remaining: ${total}`);
});

app.get("/envelopes", (req, res, next) => {
    res.json(envelopes);
});

app.get("/envelopes/:name", (req, res, next) => {
    res.send(envelopes[req.params.name]);
});

app.post("/envelopes", (req, res, next) => {
    const name = req.body.name;
    const budget = req.body.budget;
    if (total >= budget) {
        total -= budget;
        const envelope = {"budget" : budget};
        envelopes[name] = envelope;
        res.status(201).send(`New envelope created. Total budget remaining: ${total}`);
    } else {
        res.status(403).send(`Operation declined. Set budget (${budget}) exceeds total remaining budget (${total}).`);
    }
});

app.post("/envelopes/transfer/:from/:to", (req, res, next) => {
    const from = req.params.from;
    const to = req.params.to;
    const amount = req.body.amount;
    if (envelopes[from].budget >= amount) {
        envelopes[from].budget -= amount;
        envelopes[to].budget += amount;
        res.status(201).send(`New balance: ${envelopes[from].budget}, ${envelopes[to].budget}`);
    } else {
        res.status(403).send(`Operation declined. Not enough money left in ${envelopes[from]}.`);
    }  
});

app.put("/envelopes/:name", (req, res, next) => {
    const envelope = req.params.name;
    const spending = req.query.spent;
    if (envelopes[envelope].budget - spending >= 0) {
        envelopes[envelope].budget -= spending;
        res.send(`Spending logged. Remaining budget in this envelope: ${envelopes[envelope].budget}`);
    } else {
        res.status(403).send("Operation declined. Spending exceeds remaining budget.");
    }
});

app.delete("/envelopes/:name", (req, res, next) => {
    const toBeDeleted = req.params.name;
    if (envelopes[toBeDeleted]) {
        const remainingBudget = envelopes[toBeDeleted].budget;
        delete envelopes[toBeDeleted];
        total += remainingBudget;
        res.send(`Envelope "${toBeDeleted}" deleted. ${remainingBudget} restored. New total budget: ${total}`)
    }
});

app.listen(3000, () => {
    console.log("Server listening on port 3000...");
});