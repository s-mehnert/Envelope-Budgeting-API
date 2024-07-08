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

getAllButton.addEventListener("click", () => {
    fetch("http://localhost:3000/envelopes")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        })
        .then(jsonResponse => {
            serverResponseField.innerHTML = `<pre>${JSON.stringify(jsonResponse, null, 2)}</pre>`;
            // for (const [name, envelope] of Object.entries(jsonResponse)) {
            //     const envelopeDiv = document.createElement('div');
            //     envelopeDiv.classList.add('envelope');
            //     envelopeDiv.innerHTML = `
            //         <h3>${name}</h3>
            //         <p>Budget: $${envelope.budget}</p>
            //     `;
            //     serverResponseField.appendChild(envelopeDiv);
        });
});

const postForm = document.querySelector("#post");

async function sendPostData() {
    const formData = new FormData(postForm);

    try {
        const response = await fetch("http://localhost:3000/envelopes/", {
            method: "POST",
            body: formData,
        });
        console.log(await response.json());
    } catch (e) {
        console.error(e);
    }
}

postForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendPostData();
});

// postButton.addEventListener("submit", () => {
//     const name = document.getElementById("new-env");
//     const budget = document.getElementById("new-budget");
//     const postURL = "http://localhost:3000/envelopes"
//     serverResponseField.innerHTML = `New envelope: ${newName.value}\nNew budget: ${newBudget.value}`;
// });

// postButton.addEventListener("click", () => serverResponseField.innerHTML = "Opens popup to enter name and budget for new envelope.\nOnce created, envelope is displayed here.");
putButton.addEventListener("click", () => serverResponseField.innerHTML = "Opens popup to enter name of envelope and amount spent.\n Once completed, modified envelope is displayed here.");
deleteButton.addEventListener("click", () => serverResponseField.innerHTML = "Opens popup to enter name of envelope. Once completed, displays message about deleted envelope.");
