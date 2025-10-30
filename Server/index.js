const express= require("express");
const cors= require("cors");
const dotenv= require('dotenv')
const mongoose= require("mongoose")
const app = express();
app.use(cors())
dotenv.config()
app.use(express.json())



const PORT= process.env.PORT || 8000;
app.listen('port', ()=>
{
  console.log(`server is running on port ${PORT}`)
})
app.get('/', (req, res)=>
{
    res.json("Server is running succesfully")
})

mongoose.connect(process.env.MONGOURL)
.then(()=>
{
    console.log("MongoDB connected")
}).catch((err)=>
{
     console.error("MongoDB error")
})
