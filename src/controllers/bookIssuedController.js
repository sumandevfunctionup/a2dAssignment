const adminModel = require("../models/adminModel");
const bookIssuedModel=require("../models/bookIssuedModel");
const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel");


//validation
const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const bookIssue=async function(req,res){
    try{

    let inputFrombody=req.body;
    let {adminId,bookId,userId,issuedDate,returnedDate}=inputFrombody;
    if (!(Object.keys(inputFrombody).length > 0)) { return res.status(400).send({ status: false, message: "Invalid request,Please provide some details" }) }
  //adminId validation
  if (!isValid(adminId)) return res.status(400).send({ status: false, msg: "enter adminId" });
  let verifyAdmin= await adminModel.findOne({_id:adminId})
  if(!verifyAdmin) {return res.status(400).send({status:false,msg:"adminId not exist"})}
  //bookId validation
  if (!isValid(bookId)) return res.status(400).send({ status: false, msg: "enter the bookId" });
  //verify bookId
  let verifyBookId=await bookModel.findOne({isDeleted:false,_id:bookId})
  if(!verifyBookId) return res.status(400).send({status:false,msg:"enter a valid bookId"})
  //userId validation
  if (!isValid(userId)) return res.status(400).send({ status: false, msg: "enter the userId" });
  //verify userId
  let verifyUser=await userModel.findOne({_id:userId})
  if(!verifyUser) return res.status(400).send({status:false,msg:"please enter a valid userId"});
  //issuedate validation
  if (!isValid(issuedDate)) return res.status(400).send({ status: false, msg: "enter issuedate" });
  //validation returnedDate
  if (!isValid(returnedDate)) return res.status(400).send({ status: false, msg: "enter returned date" });
    let newIssue=await bookIssuedModel.create(inputFrombody);
    return res.status(201).send({status:true,msg:"book issued",Data:newIssue})
}
catch(error){
    console.log(error)
    return res.status(500).send({status:false,msg:error.message})
}}



/////////////////////////////////////////////////////////////////////////////////////////////////
const getAllIssuedList=async function(req,res){
    try{
    let getList=await bookIssuedModel.find().select({createdAt:0,updatedAt:0,__v:0})
    return res.status(200).send({status:true,msg:"list of issued books",LIST:getList})
}
catch(error){
    console.log(error)
    return res.status(500).send({status:false,msg:error.message})
}}

//////////////////////////////////////////////////////////////////////////////////////////////////
const getBookIssueById= async function(req,res){
    try{
    let userId=req.params.userId;
 
    let getUserBooks=await bookIssuedModel.find({userId:userId}).select({bookId:1,issuedDate:1,returnedDate:1})
    return res.status(200).send({status:true,msg:"your book issued record",LIST:getUserBooks})

} catch(error){
    console.log(error)
    return res.status(500).send({status:false,msg:error.message})
}}
 
//update book-issue
const updateBookIssueDoc=async function(req,res){

    try{ 
    let data=req.body;
    if (!(Object.keys(data).length > 0)) { return res.status(400).send({ status: false, message: "Invalid request,Please provide some details" }) }
    let {issuedDate,returnedDate}=data;
    let bookIssueId= req.params.bookIssueId;
    let findId=await bookIssuedModel.findById({_id:bookIssueId})
    if(!findId)
    return res.status(400).send({ status: false, message: "bookissueId is invalid" })
      
 let updatation=await bookIssuedModel.findOneAndUpdate({_id:bookId},
      {  $set:{
            issuedDate:issuedDate,returnedDate:returnedDate
        
      }},{new:true})
      return res.status(200).send({status:true,msg:"book details updated",updatation})
    } catch(error){
        console.log(error)
        return res.status(500).send({status:false,msg:error.message})
     

}

}
module.exports.getBookIssueById=getBookIssueById;
module.exports.bookIssue=bookIssue;
module.exports.getAllIssuedList=getAllIssuedList; 
module.exports.updateBookIssueDoc=updateBookIssueDoc;