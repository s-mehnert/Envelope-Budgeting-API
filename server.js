const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = {
    origin: "*", // TODO: set to real accessing URL once deployed
    method: "GET,PUT,POST,DELETE",
    allowedHeaders:"*"
}

const envelopes = { // uncomment following lines to pre-populate a few envelopes for testing purposes (total budget will not be affected)
    // "groceries" : {"budget" : 1000, "spent": 0},
    // "rent & utilities" : {"budget" : 2000, "spent" : 0},
    // "clothing" : {"budget" : 200, "spent" : 0}
};
let total = 5000;

const envelopeExists = name => {
    return envelopes.hasOwnProperty(name);
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "/index.html"));
});

app.get("/total", (req, res) => {
    res.send(`Total budget remaining: ${total}`);
});

app.get("/envelopes", (req, res) => {
    res.json(envelopes);
});

app.get("/envelopes/:name", (req, res) => {
    res.send(envelopes[req.params.name]);
});

app.post("/envelopes", (req, res) => {
    const name = req.body.newEnv;
    const budget = req.body.newBudget;
    if (envelopeExists(name)) {
        res.status(403).send(`Operation declined. \nEnvelope (${budget}) already exists. \nPlease, select another name.`);
    } else if (total >= budget) {
        total -= budget;
        const envelope = {"budget" : budget, "spent" : 0};
        envelopes[name] = envelope;
        res.status(201).send(`New envelope "${name}" ${JSON.stringify(envelopes[name])} created. \nTotal budget remaining: ${total}`);
    } else {
        res.status(403).send(`Operation declined. \nSet budget (${budget}) exceeds total remaining budget (${total}).`);
    }
});

app.post("/envelopes/transfer/:from/:to", (req, res) => {
    const from = req.params.from;
    const to = req.params.to;
    const amount = Number(req.query.transfer);
    if (!envelopeExists(from) || !envelopeExists(to)) {
        res.status(403).send(`Operation declined. \nPlease make sure to enter names of existing envelopes to transfer money between them.`);
    } else if (envelopes[from].budget >= amount) {
        envelopes[from].budget -= amount;
        envelopes[to].budget += amount;
        res.status(201).send(`New balance: \nEnvelope "${from}" - $${envelopes[from].budget}, \nEnvelope "${to}" - $${envelopes[to].budget}`);
    } else {
        res.status(403).send(`Operation declined. \nNot enough money left in envelope "${from}".`);
    }  
});

app.put("/envelopes/:name", (req, res) => {
    const envelope = req.params.name;
    const spending = Number(req.query.spent);
    if (!envelopeExists(envelope)) {
        res.status(403).send(`Operation declined. \nThere is no envelope "${envelope}". \nPlease enter a valid name.`);
    } else if (envelopes[envelope].budget - spending >= 0) {
        envelopes[envelope].budget -= spending;
        envelopes[envelope].spent += spending;
        res.send(`Spending logged. \nRemaining budget in envelope "${envelope}": $${envelopes[envelope].budget}`);
    } else {
        res.status(403).send("Operation declined. \nSpending exceeds remaining budget.");
    }
});

app.delete("/envelopes/:name", (req, res) => {
    const toBeDeleted = req.params.name;
    if (!envelopeExists(toBeDeleted)) {
        res.status(403).send(`Operation declined. \nThere is no envelope "${toBeDeleted}". \nPlease enter a valid name.`);
    } else {
        const remainingBudget = envelopes[toBeDeleted].budget;
        delete envelopes[toBeDeleted];
        total += remainingBudget;
        res.send(`Envelope "${toBeDeleted}" deleted, E${remainingBudget} restored. \nNew total budget: $${total}`)
    }
});

app.listen(3000, () => {
    console.log("Server listening on port 3000...");
});