const express=require ('express');
const { connection } = require('./db');
const { userRoute } = require('./routes/user.route');
const jwt = require('jsonwebtoken');
const {auth}=require("./meelewere/auth.meedlewere")
const {noteRoute}=require("./routes/noteRoute")
const app=express();
const cors = require('cors')

app.use(express.json());
app.use(cors())

app.use("/users",userRoute)

// Protected////
app.use(auth)
app.get("/movie",async(req,res)=>{
  res.status(200).send('movie data')
});

app.get("/serese",async(req,res)=>{
  res.status(200).send('serese data')
})

app.use("/notes",noteRoute)


app.listen(8080,async()=>{
    try {
        await connection
        console.log('connected to DB')
    } catch (err) {
        console.log(err.message)
        console.log('can not connect to the DB')
    }
    console.log("port is running at 8080")
})