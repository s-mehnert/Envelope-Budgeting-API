// grab all relevant HTML elements
const getAllButton = document.getElementById("get-all");

const postName = document.getElementById("new-env");
const postBudget = document.getElementById("new-budget");
const postButton = document.getElementById("create-env");

const putName = document.getElementById("put-env");
const putAmount = document.getElementById("spent");
const putButton = document.getElementById("update-env");

const deleteName = document.getElementById("del-env");
const deleteButton = document.getElementById("delete-env");

const serverResponseField = document.getElementById("response-display");
const envelopeDisplayField = document.getElementById("envelope-display");

// helper functions for visually displaying envelopes

const displayEnv = jsonResponse => {
    clearDisplay();
    for (const [name, envelope] of Object.entries(jsonResponse)) {
        const envelopeDiv = document.createElement('div');
        envelopeDiv.classList.add('envelope');
        envelopeDiv.innerHTML = `
            <div></div>
            <h3>${name}</h3>
            <p>Budget: $${envelope.budget}</p>
        `; // add envelope image as well as styling in CSS
        envelopeDisplayField.appendChild(envelopeDiv);
    }
};

const clearDisplay = () => {
    envelopeDisplayField.innerHTML = "";
};

// add event listeners to connected HTTP routes
getAllButton.addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:3000/envelopes");
        if (response.ok) {
            const jsonResponse = await response.json();
            serverResponseField.innerHTML = `
            <h4>--- listing all envelopes ---</h4>
            <pre>${JSON.stringify(jsonResponse, null, 2)}</pre>
            `;
            displayEnv(jsonResponse);
        } else {
        throw new Error(`HTTP Error: ${response.status}`);
        }
    } catch (err) {
        console.log(err);
    }
});

postButton.addEventListener("click", async () => {
    const envName = postName.value;
    const envBudget = Number(postBudget.value);
    if (envName === "" || envBudget === 0) {
        serverResponseField.innerHTML = "Please enter a name and budget before clicking the CREATE button.";
    } else {
        try {
            const response = await fetch("http://localhost:3000/envelopes", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    // Include any additional headers if needed
                    // "Authorization": "Bearer YOUR_ACCESS_TOKEN"
                },
                body: JSON.stringify({newEnv: envName, newBudget: envBudget}) 
            });
            if (response.ok || response.status === 403) {
                const jsonResponse = await response.text();
                clearDisplay();
                serverResponseField.innerHTML = `
                <h4>--- creating envelope ---</h4>
                <pre>${jsonResponse}</pre>
                `;
            } else {
                throw new Error("Request failed!");
            }
        } catch (err) {
            console.log(err);
        }
    }
});

putButton.addEventListener("click", async () => {
    const envName = putName.value;
    const envSpent = Number(putAmount.value);
    if (envName === "" || envSpent === 0) {
        serverResponseField.innerHTML = "Please enter a name and amount spent before clicking the LOG SPENDING button.";
    } else {
        const envURL = "http://localhost:3000/envelopes/" + envName + "?spent=" + envSpent;
        try {
            const response = await fetch(envURL, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    // Include any additional headers if needed
                    // "Authorization": "Bearer YOUR_ACCESS_TOKEN"
                }
            });
            if (response.ok || response.status === 403) {
                const jsonResponse = await response.text();
                clearDisplay();
                serverResponseField.innerHTML = `
                <h4>--- updating envelope ---</h4>
                <pre>${jsonResponse}</pre>
                `;
            } else {
                throw new Error("Request failed!");
            }
        } catch (err) {
            console.log(err);
        }
    }
});

deleteButton.addEventListener("click", async () => {
    const envName = deleteName.value;
    if (envName === "") {
        serverResponseField.innerHTML = "Please enter a name before clicking the DELETE button.";
    } else {
        const envURL = "http://localhost:3000/envelopes/" + envName;
        try {
            const response = await fetch(envURL, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    // Include any additional headers if needed
                    // "Authorization": "Bearer YOUR_ACCESS_TOKEN"
                }
            }); 
            if (response.ok) {
                const jsonResponse = await response.text();
                clearDisplay();
                serverResponseField.innerHTML = `
                <h4>--- deleting envelope ---</h4>
                <pre>${jsonResponse}</pre>
                `;
            } else {
                throw new Error("Request failed!");
            }
        } catch (err) {
            console.log(err);
        }
    }    
});