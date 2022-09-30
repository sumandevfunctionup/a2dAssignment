const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId
const bookSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  authorName:{type:String,
required:true
},
publisherName:{type:String,
required:true},
adminId:{
    type:ObjectId,
    ref:"admin"
},
category:{
    type:String,
    required:true
},
totalPages:{
    type:Number,
    required:true
},
isDeleted:{
  type:Boolean,
  default:false
},
price:{
  type:String,
  required:true
}
},{timestamps:true});

module.exports=mongoose.model("books",bookSchema);
