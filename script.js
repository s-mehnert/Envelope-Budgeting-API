console.log("Loading JS")

const getAllButton = document.getElementById("get-all");
const postName = document.getElementById("new-env");
const postBudget = document.getElementById("new-budget");
const postButton = document.getElementById("create-env");
const putButton = document.getElementById("update-env");
const deleteButton = document.getElementById("delete-env")
const serverResponseField = document.getElementById("response-display");

// let serverResponse = "Test...test...test"

// const displayServerResponse = () => {
//     serverResponseField.innerHTML = serverResponse;
// };

// const eventHandler = (event) => {
//     serverResponseField.innerHTML = event.timeStamp;
//     console.log(event.timeStamp)
// };

// pure JS version worked on with Travis and chatGPT

// getAllButton.addEventListener("click", () => {
//     fetch("http://localhost:3000/envelopes")
//         .then(response => response.json())
//         .then(data => 
//             {
//                 for (const [name, envelope] of Object.entries(data)) {
//                     const envelopeDiv = document.createElement('div');
//                     envelopeDiv.classList.add('envelope');
//                     envelopeDiv.innerHTML = `
//                         <h3>${name}</h3>
//                         <p>Budget: $${envelope.budget}</p>
//                     `;
//                     serverResponseField.appendChild(envelopeDiv);
//                 }
//             // serverResponseField.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
//         });
// });

getAllButton.addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:3000/envelopes");
        if (response.ok) {
            const jsonResponse = await response.json();
            serverResponseField.innerHTML = `<pre>${JSON.stringify(jsonResponse, null, 2)}</pre>`;
            // for (const [name, envelope] of Object.entries(jsonResponse)) {
            //     const envelopeDiv = document.createElement('div');
            //     envelopeDiv.classList.add('envelope');
            //     envelopeDiv.innerHTML = `
            //         <h3>${name}</h3>
            //         <p>Budget: $${envelope.budget}</p>
            //     `;
            //     serverResponseField.appendChild(envelopeDiv);
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
            if (response.ok) {
                const jsonResponse = await response.text();
                serverResponseField.innerHTML = jsonResponse;
            } else if (response.status === 403) {
                const jsonResponse = await response.text();
                serverResponseField.innerHTML = jsonResponse;
            } else {
                throw new Error("Request failed!");
            }
        } catch (err) {
            console.log(err);
        }
    }
});


// postButton.addEventListener("click", () => serverResponseField.innerHTML = "Opens popup to enter name and budget for new envelope.\nOnce created, envelope is displayed here.");
putButton.addEventListener("click", () => serverResponseField.innerHTML = "Opens popup to enter name of envelope and amount spent.\n Once completed, modified envelope is displayed here.");
deleteButton.addEventListener("click", () => serverResponseField.innerHTML = "Opens popup to enter name of envelope. Once completed, displays message about deleted envelope.");
