const express= require("express");
const cors= require("cors");
const mongoose= require("mongoose")
const {config}=require("dotenv");
config();

const auth=require('./routes/auth')
const notes=require('./routes/notes')
const app = express();
app.use(express.json())
app.use(cors(
  {
    origin:"http://localhost:5173",
  credentials:true,
  allowedHeaders: ["Content-Type", "Authorization"],
  }
))



app.use('/api/auth', auth);
app.use('/api/notes', notes);




mongoose.connect(process.env.MONGOURL)
.then(()=>
{
    console.log("MongoDB connected")
}).catch((err)=>
{
     console.error("MongoDB error")
})
const PORT= process.env.PORT || 8000;
app.listen(PORT, ()=>
{
  console.log(`server is running on port ${PORT}`)
})
