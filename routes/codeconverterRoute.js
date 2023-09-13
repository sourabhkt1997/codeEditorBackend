let express=require("express")
let converterRoute=express.Router()
require("dotenv").config()
let apikey=process.env.APIKEY
let axios=require("axios")
converterRoute.post("/features",async(req,res)=>{
    try {
        let {input,language}=req.body 
       let {option}=req.query
       let prompt=""
       if(option=="convert"){
        prompt=`convert this code ${input} to ${language}.only need the code dont need the explanation.and code should be in line by line and more readable also`
       }
       if(option=="debug"){
         prompt=`Debug this code ${input}.`
       }
       if(option=="qualitycheck"){
        prompt=`act as a code evaluator and evaluate this code ${input} .and give a feed back on the code quality, code readability and also provide how to better the code quality .also provide score based on the parameter code readability`
       }
      let response=await axios.post("https://api.openai.com/v1/chat/completions",{
        model: "gpt-3.5-turbo",
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
      },
      {
        headers: {
            "Authorization": `Bearer ${apikey}`,
            "Content-Type": "application/json",
        },
      }
      );
      let ans=response.data.choices[0].message.content
      if(ans){
        res.status(201).send({message:ans})
      }
        
    } catch (error) {
        res.status(402).send({message:error.message})
    }
})






module.exports={converterRoute}