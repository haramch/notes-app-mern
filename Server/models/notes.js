const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const notesSchema= new Schema({
    title:{type:String, required:true},
    content:{type:String, required:true },
    tag:{type:[String], default:[]},
    isPinned:{type:Boolean, default:false},
   userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

      date: {
    type: Date,
    default: Date.now,
  },

}, {timestamps:true})

const notesModel=mongoose.models.note || mongoose.model('note', notesSchema)
module.exports=notesModel;