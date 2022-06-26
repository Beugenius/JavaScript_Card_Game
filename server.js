const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');

app.use(express.static(__dirname))
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/javascript_final.html');
    
});

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on port ${PORT}! You better go catch it!`)
});
