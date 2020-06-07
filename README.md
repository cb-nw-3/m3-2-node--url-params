# 3.2 Node.Js: Foundations

## Setup

1. Open a terminal window and type `yarn install`
2. Start up the server by typing `yarn dev`

## Workshop

The exercises are in the the `__workshop` folder.

⚠️ But before you start them, you will have to fix the server, I think. Somehow, things got a little messed up and it won't run until the bugs are squashed.

<img src='https://media3.giphy.com/media/BxWTWalKTUAdq/giphy.gif' />

## Getting stuck?

🚨 It wil be better to **not** look at the solutions.

If you get stuck, see a TC.

The solution is a complete solution to _all_ of the questions and looking at it before you finish might confuse you rather than help you.

```
Steps done to fix server issues:

Start server.js

Error:
const app = express();
ReferenceError: express is not defined
Define express with: const express = require('express');

Error: 
Cannot find module 'express'
Added module dependencies to package.json file: dependencies: "express": "^4.17.1",
Stop server, run yarn install, start server 

Error: 
app.git('*', (req, res) => {
Fix typo: app.get('*', (req, res) => {

Error: 
get.listen(PORT, () => console.log(`Listening on port ${PORT}`));
ReferenceError: get is not defined
Replace 'get' with 'app'

app finally load at: http://localhost:8000/
```

