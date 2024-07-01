const getAllButton = document.getElementById("get-all");
const postButton = document.getElementById("new-env");
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

getAllButton.addEventListener("click", () => serverResponseField.innerHTML = "Displays all envelopes.");
postButton.addEventListener("click", () => serverResponseField.innerHTML = "Opens popup to enter name and budget for new envelope.\nOnce created, envelope is displayed here.");
putButton.addEventListener("click", () => serverResponseField.innerHTML = "Opens popup to enter name of envelope and amount spent.\n Once completed, modified envelope is displayed here.");
deleteButton.addEventListener("click", () => serverResponseField.innerHTML = "Opens popup to enter name of envelope. Once completed, displays message about deleted envelope.");
