let express = require('express');
let app = express();
let port = 8500;
// built in middleware to parse body of request
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log(`servr is ready to run on port ${port}`)
})