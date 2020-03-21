//IMPORT EXPRESS
const express = require('express');
const app = express();

//ROUTE HANDLER FOR: GET METHOD
app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

//PORT LISTENER
const PORT = process.env.PORT || 5000;
app.listen(PORT);