const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;
const bookIssueSchema= new mongoose.Schema({
 adminId:{type:ObjectId,
    ref:"admin",
         required:true
},
bookId:{
    type:ObjectId,
    ref:"book",
    required:true
},
userId:{type:ObjectId,
    ref:"user",
    required:true

},
issuedDate:{
    type:String,
    required:true
},
returnedDate:{
    type:String,
    required:true
}


},{timestamps:true})

module.exports=mongoose.model("bookIssue",bookIssueSchema);
