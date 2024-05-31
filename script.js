const getAllButton = document.getElementById("get-all");
const postButton = document.getElementById("new-env");
const putButton = document.getElementById("update-env");
const deleteButton = document.getElementById("delete-env")
const serverResponseField = document.getElementById("response-display");

let serverResponse = "Test...test...test"

const displayServerResponse = () => {
    serverResponseField.innerHTML = serverResponse;
};

const eventHandler = (event) => {
    serverResponseField.innerHTML = event.timeStamp;
    console.log(event.timeStamp)
};

getAllButton.addEventListener("click", displayServerResponse);
postButton.addEventListener("click", displayServerResponse);
putButton.addEventListener("click", displayServerResponse);
deleteButton.addEventListener("click", displayServerResponse);
