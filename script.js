console.log("Loading JS")

const getAllButton = document.getElementById("get-all");
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

// ATTEMPT TO GET DATA FROM FORM
// const postForm = document.querySelector("#post");

// async function sendPostData() {
//     const formData = new FormData(postForm);

//     try {
//         const response = await fetch("http://localhost:3000/envelopes/", {
//             method: "POST",
//             body: formData,
//         });
//         console.log(await response.json());
//     } catch (e) {
//         console.error(e);
//     }
// }

// postForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     sendPostData();
// });

// postButton.addEventListener("submit", () => {
//     const name = document.getElementById("new-env");
//     const budget = document.getElementById("new-budget");
//     const postURL = "http://localhost:3000/envelopes"
//     serverResponseField.innerHTML = `New envelope: ${newName.value}\nNew budget: ${newBudget.value}`;
// });

// Fetch request for post route without async
// postButton.addEventListener("click", () => {
//     fetch("http://localhost:3000/envelopes", {
//         method: "post",
//         body: JSON.stringify({"new-env": "test", "new-budget": 50})
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error("Request Failed!");
//     }, networkError => console.log(networkError.message))
//     .then(jsonResponse => {
//         serverResponseField.innerHTML = JSON.stringify(jsonResponse);
//     });
// });

postButton.addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:3000/envelopes", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                // Include any additional headers if needed
                // "Authorization": "Bearer YOUR_ACCESS_TOKEN"
            },
            body: JSON.stringify({newEnv: "test", newBudget: 50}) // adjust code so input from index.html is being fetched
        });
        if (response.ok) {
            const jsonResponse = await response.text();
            serverResponseField.innerHTML = jsonResponse;
        } else {
            throw new Error("Request failed!");
        }
    } catch (err) {
        console.log(err);
    }
});


// postButton.addEventListener("click", () => serverResponseField.innerHTML = "Opens popup to enter name and budget for new envelope.\nOnce created, envelope is displayed here.");
putButton.addEventListener("click", () => serverResponseField.innerHTML = "Opens popup to enter name of envelope and amount spent.\n Once completed, modified envelope is displayed here.");
deleteButton.addEventListener("click", () => serverResponseField.innerHTML = "Opens popup to enter name of envelope. Once completed, displays message about deleted envelope.");
