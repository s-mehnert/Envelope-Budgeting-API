# [REST API](https://envelope-budgeting-api.onrender.com) for Envelope Budgeting

Using [Envelope Budgeting](https://www.thebalancemoney.com/what-is-envelope-budgeting-1293682) principles, this API allows users to manage their personal budget.  
At this point the project serves mainly to demonstrate the workings of an API and can be accessed via a simple front-end. The total budget available is hard coded to $5000 and settings won't be stored beyond the current session. 

## Technology used

Back-End: Express.js  
Front-End: HTML, CSS, JavaScript  
Deployed via: GitHub Pages and Render  

## Routes

GET (1) - displays all budget envelopes  
GET (2) - displays remaining total budget  
GET (3) - fetches individual envelope by name (not implemented in front-end)  
POST (1) - creates new envelope and assigns set budget  
POST (2) - transfers budget from one envelope to another  
PUT - logs spendings in a particular envelope  
DELETE - deletes an envelope  

## Features

- Data validation to not overspend total budget or individual envelope
- Name check for existing envelopes

## Usage

To see the API in action visit: [Envelope-Budgeting-API](https://envelope-budgeting-api.onrender.com)  
(Note that the API runs on a free Render instance, times to load might therefore be a little slower.) 

## Installation

For using the code on your own machine you need to fork the repo and have node.js and express.js installed. To see the API in action and test the routes using a service like Postman you need to spin up the server manually in the terminal:

```bash 
npm start
``` 

## Planned for version 2:
- User can set their own Total Budget (now fixed to $5000).
- Add database to store envelopes.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License

[MIT](https://choosealicense.com/licenses/mit/)