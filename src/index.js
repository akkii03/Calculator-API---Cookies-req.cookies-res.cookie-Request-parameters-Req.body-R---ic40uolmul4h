const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

let oneMil = 1_000_000;

function isNumericString(str) {
    return !Number.isNaN(Number(str));
}

app.use((req,res,next) => {
    const{num1,num2} = req.body;
    if(num1===undefined || num2===undefined || num1==="" || num2==="") {
        res.send({status : "error", message : "Invalid data types"});
    }
    else {
        next();
    }
})

app.use((req,res,next) => {
    const{num1,num2} = req.body;
    if(!isNumericString(num1) || !isNumericString(num2)) {
        res.send({status : "error", message : "Invalid data types"});
    }
    else {
        next();
    }
})

app.use((req,res,next) => {
    const{num1,num2} = req.body;
    const actualNum1 = Number(num1);
    const actualNum2 = Number(num2);
    req.body.num1 = actualNum1;
    req.body.num2 = actualNum2;
    next();
})

app.use((req,res,next) => {
    const{num1,num2} = req.body;
   
    if(num1 < -oneMil || num2 < -oneMil) {
        res.send({status : "error", message : "Underflow"});
    }
    else if(num1 > oneMil || num2 > oneMil) {
        res.send({status : "error", message : "Overflow"});
    }
    else {
        next();
    }
})

app.get('/', (req,res)=> {

    res.send("Hello world!")
})

app.post('/add', (req,res,next)=> {
    const{num1,num2} = req.body;
    const sum = num1 + num2;

    req._payload = {
        status: "success",
        message: "the sum of given two numbers",
        sum,
    }
    next();
})

app.post('/sub', (req,res,next)=> {
    const{num1,num2} = req.body;
    const difference = num1 - num2;
    
    req._payload = {
        status: "success",
        message: "the difference of given two numbers",
        difference,
    }
    next();
})

app.post('/multiply', (req,res,next)=> {
    const{num1,num2} = req.body;
    const result = num1 * num2;

    req._payload = {
        status: "success",
        message: "The product of given numbers",
        result,
    }
    next();
})

app.post('/divide', (req,res,next)=> {
    const{num1,num2} = req.body;
    
    if(num2===0) {
        res.send({status : "error", message : "Cannot divide by zero"});
    }

    const result = num1 / num2;

    req._payload = {
        status: "success",
        message: "The division of given numbers",
        result,
    }
    next();
})

app.use((req,res) => {
    let{sum,difference,result} = req._payload;
    let value  = sum || difference || result;

    if(value < -oneMil) {
        res.send({status : "error", message : "Underflow"});
    }
    else if(value > oneMil) {
        res.send({status : "error", message : "Overflow"});
    }
    else {
        res.send(req._payload);
    }
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
