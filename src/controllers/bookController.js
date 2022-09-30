const bookModel=require('../models/bookModel');
const ObjectId=require("mongoose").Types.ObjectId;

//validation
const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}




const createBook=async function(req,res){
    try{
    let inputFrombody=req.body;
    let {name,authorName,publisherName,adminId,category,totalPages,price}=inputFrombody;

    if (!(Object.keys(inputFrombody).length > 0)) { return res.status(400).send({ status: false, message: "Invalid request,Please provide some details" }) }
    //name validation
    if (!isValid(name)) return res.status(400).send({ status: false, msg: "enter the valid name" });
    //authorname validation
    if (!isValid(authorName)) return res.status(400).send({ status: false, msg: "enter the valid author name" });
    //publisher validation
    if (!isValid(publisherName)) return res.status(400).send({ status: false, msg: "enter the valid publisher name" });
    //adminId validation
    if (!isValid(adminId)) return res.status(400).send({ status: false, msg: "enter the valid adminId" });
    //category validation
    if (!isValid(category)) return res.status(400).send({ status: false, msg: "enter the valid category information" });
    //total pages validation
    if (!isValid(totalPages)) return res.status(400).send({ status: false, msg: "enter the valid total-pages" });
    //price validation
    if (!isValid(price)) return res.status(400).send({ status: false, msg: "enter the valid price" });


    let newBook=await bookModel.create(inputFrombody);
    return res.status(201).send({status:true,msg:"book created",BOOK:newBook})
    }
    catch(error){
        console.log(error)
        return res.status(500).send({status:false,msg:error.message})
    }
}; 
////////////////////////////////////////////////////////////////////////////////////////
const getAllBooks=async function(req,res){
    try{
    let listOfBooks= await bookModel.find({isDeleted:false}).select({name:1,authorName:1,publisherName:1,category:1,totalPages:1,_id:0}).sort({createdAt:-1})
    return res.status(200).send({status:true,msg:"LIST OF BOOKS",BOOKS:listOfBooks})

}
catch(error){
    console.log(error)
    return res.status(500).send({status:false,msg:error.message})
}
}

//////////////////////////////////////////////////////////////////////////////////////////
const getBooksDetails=async function(req,res){
    try{
    let name=req.params.name;
  
    
   //validation
    let verifyBook=await bookModel.findOne({isDeleted:false,name:name})
    if(!verifyBook) return res.status(404).send({status:false,msg:"book does not exist"})

    let showBooks=await bookModel.findOne({isDeleted:false,name:name}).select({name:1,authorName:1,publisherName:1,category:1,totalPages:1,_id:0,price:1}).sort({createdAt:-1})
    return res.status(200).send({status:true,BOOK:showBooks});
} catch(error){
    console.log(error)
    return res.status(500).send({status:false,msg:error.message})
}} 
 //////////////////////////////////////////////////////////////////////
const totalBooks= async function(req,res){
    try{
    let noOfBooks=await bookModel.find({isDeleted:false}).countDocuments()
    return res.status(200).send({msg:"total number of books",noOfBooks})
}
catch(error){
    console.log(error)
    return res.status(500).send({status:false,msg:error.message})
}}
///////////////////////////////////////////////////////////////////////
const updateBook=async function(req,res){
    try{

    let data=req.body;
    if (!(Object.keys(data).length > 0)) { return res.status(400).send({ status: false, message: "Invalid request,Please provide some details" }) }
    let{price,totalPages,category}=data;
    

let bookId=req.params.bookId;

let verifyBook=await bookModel.findOne({isDeleted:false,_id:bookId})
if(!verifyBook) return res.status(404).send({status:false,msg:"book not exist"})


    let updatation=await bookModel.findOneAndUpdate({_id:bookId},
      {  $set:{
            price:price,totalPages:totalPages,category:category
        
      }},{new:true})
      return res.status(200).send({status:true,msg:"book details updated",updatation})
    } catch(error){
        console.log(error) 
        return res.status(500).send({status:false,msg:error.message})
    }
}
const deleteBook=async function(req,res){
    try{
    let data=req.params.bookId;
    if(!data) { return res.status(400).send({ status: false, message: "Valid bookId is required" }) }

    let deleted=await bookModel.findOne({isDeleted:true,_id:data})
    if(deleted) return res.status(404).send({status:false,msg:"book does not exist"})

    let deletation=await bookModel.findOneAndUpdate({_id:data},{
        $set:{isDeleted:true}},{new:true} 
    )
  
return res.status(200).send({statud:true,msg:"book deleted successfully"})
} catch(error){
    console.log(error)
    return res.status(500).send({status:false,msg:error.message})
}
}  
module.exports.createBook=createBook;
module.exports.getAllBooks=getAllBooks;
module.exports.totalBooks=totalBooks;
module.exports.deleteBook=deleteBook;
module.exports.getBooksDetails=getBooksDetails;
module.exports.updateBook=updateBook;