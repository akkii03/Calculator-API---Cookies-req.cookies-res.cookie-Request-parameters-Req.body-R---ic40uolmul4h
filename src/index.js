const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

const One_Million = 1_000_000;




function check (num) {
    return !Number.isNaN(Number(num));
}


// check number is middle ware which is used to
// check the number is valid or not
// or  check both value contain somthing 
function checkNumber (req,res,next) {
    const {num1,num2} = req.body;
    const inValid = !num1 || !num2;
    if(inValid || !check(num1) || !check(num2) || num1=="" || num2 =="" || num1<0 || num2<0 ) {
        res.send({
            status:"error",
            message:"Invalid data types"
        });
    }
    next();
}

function UnderAndOverFlow (req,res,next) {
    const {num1,num2} = req.body;
    const ActualNumber1 = Number(num1);
    const ActualNumber2 = Number(num2);
    if(ActualNumber1>One_Million || ActualNumber2>One_Million) {
        res.send({
            status:"error",
            message:"Overflow"
        });
    }
    else if(ActualNumber1<-One_Million || ActualNumber2<-One_Million) {
        res.send({
            status:"error",
            message:"Underflow"
        });
    }
    next();
}

app.post("/add",checkNumber,UnderAndOverFlow,(req,res)=>{
    const {num1,num2} = req.body;
    const ActualNumber1 = Number(num1);
    const ActualNumber2 = Number(num2);
    const result = ActualNumber1+ActualNumber2;
    const msg = "the sum of given two numbers";
   
    res.send({
        status:"success",
        message:msg,
        sum:result,
    });   
});

app.post("/sub",checkNumber,UnderAndOverFlow,(req,res)=>{
    const {num1,num2} = req.body;
    const ActualNumber1 = Number(num1);
    const ActualNumber2 = Number(num2);
    const result = ActualNumber1-ActualNumber2;
    const msg = "the difference of given two numbers";
    
    res.send({
        status:"success",
        message:msg,
        difference:result,
    });
});

app.get("/",(req,res)=>{
    res.send("Hello world!");
})

app.post("/multiply",checkNumber,UnderAndOverFlow,(req,res)=>{
    const {num1,num2} = req.body;
    const msg = "The product of given numbers";
    const ActualNumber1 = Number(num1);
    const ActualNumber2 = Number(num2);
    const ans = ActualNumber1*ActualNumber2;
    res.send({
        status:"success",
        message:msg,
        result:ans,
    });
});

app.post("/divide",checkNumber,UnderAndOverFlow,(req,res)=>{
    const {num1,num2} = req.body;
    if(num2===0) {
        res.send({
            status:"error",
            message:"Cannot divide by zero"
        }); 
    }else{
        const msg = "The division of given numbers";
        const ActualNumber1 = Number(num1);
        const ActualNumber2 = Number(num2);
        const ans = ActualNumber1/ActualNumber2;
        res.send({
            status:"success",
            message:msg,
            result:ans,
        });
    }
})
// your code goes here


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;