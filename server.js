const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
    origin: "*", // set to real accessing URL once deployed
    method: "GET,PUT,POST,DELETE",
    allowedHeaders:"*"
}

const envelopes = {
    // "groceries" : {"budget" : 1000, "spent": 0},
    // "rent & utilities" : {"budget" : 2000, "spent" : 0},
    "clothing" : {"budget" : 200, "spent" : 0}
};
let total = 5000;

const envelopeExists = name => {
    return envelopes.hasOwnProperty(name);
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.send("<h1>Hello, World!</h1>");
});

// app.get("/envelopes/:total", (req, res, next) => {
    // res.send(`Total budget remaining: ${total}`);
// });

app.get("/envelopes", (req, res, next) => {
    res.json(envelopes);
});

app.get("/envelopes/:name", (req, res, next) => {
    res.send(envelopes[req.params.name]);
});

app.post("/envelopes", (req, res, next) => {
    const name = req.body.newEnv;
    const budget = req.body.newBudget;
    if (envelopeExists(name)) {
        res.status(403).send(`Operation declined. Envelope (${budget}) already exists. Please, select another name.`);
    } else if (total >= budget) {
        total -= budget;
        const envelope = {"budget" : budget, "spent" : 0};
        envelopes[name] = envelope;
        res.status(201).send(`New envelope "${name}" ${JSON.stringify(envelopes[name])} created. Total budget remaining: ${total}`);
    } else {
        res.status(403).send(`Operation declined. Set budget (${budget}) exceeds total remaining budget (${total}).`);
    }
});

app.post("/envelopes/transfer/:from/:to", (req, res, next) => {
    const from = req.params.from;
    const to = req.params.to;
    const amount = Number(req.query.transfer);
    if (!envelopeExists(from) || !envelopeExists(to)) {
        res.status(403).send(`Operation declined. Please make sure to enter names of existing envelopes to transfer money between them.`);
    } else if (envelopes[from].budget >= amount) {
        envelopes[from].budget -= amount;
        envelopes[to].budget += amount;
        res.status(201).send(`New balance: Envelope "${from}" - ${envelopes[from].budget}, Envelope "${to}" - ${envelopes[to].budget}`);
    } else {
        res.status(403).send(`Operation declined. Not enough money left in envelope "${from}".`);
    }  
});

app.put("/envelopes/:name", (req, res, next) => {
    const envelope = req.params.name;
    const spending = Number(req.query.spent);
    if (!envelopeExists(envelope)) {
        res.status(403).send(`Operation declined. There is no envelope "${envelope}". Please enter a valid name.`);
    } else if (envelopes[envelope].budget - spending >= 0) {
        envelopes[envelope].budget -= spending;
        envelopes[envelope].spent += spending;
        res.send(`Spending logged. Remaining budget in envelope "${envelope}": ${envelopes[envelope].budget}`);
    } else {
        res.status(403).send("Operation declined. Spending exceeds remaining budget.");
    }
});

app.delete("/envelopes/:name", (req, res, next) => {
    const toBeDeleted = req.params.name;
    if (!envelopeExists(toBeDeleted)) {
        res.status(403).send(`Operation declined. There is no envelope "${toBeDeleted}". Please enter a valid name.`);
    } else {
        const remainingBudget = envelopes[toBeDeleted].budget;
        delete envelopes[toBeDeleted];
        total += remainingBudget;
        res.send(`Envelope "${toBeDeleted}" deleted. ${remainingBudget} restored. New total budget: ${total}`)
    }
});

app.listen(3000, () => {
    console.log("Server listening on port 3000...");
});