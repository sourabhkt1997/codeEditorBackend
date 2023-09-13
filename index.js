let express=require("express")
let app=express()
require("dotenv").config()
let port=process.env.PORT || 3000
app.use(express.json())
let cors=require("cors")
app.use(cors())
let {converterRoute}=require("./routes/codeconverterRoute")
const { assert } = require("console")

//testing route
app.get("/",async(req,res)=>{
   try {
    res.status(200).send("hello")
   } catch (error) {
    res.status(400).send(error.message)
   }
})


app.use("/api",converterRoute)




app.listen(port,"0.0.0.0",async()=>{
   try {
      console.log("server is running")
   } catch (error) {
    console.log(error)
   }  
})