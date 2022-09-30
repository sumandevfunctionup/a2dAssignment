const userModel=require("../models/userModel");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const saltRound=10;

//validation
const isValid = function (value) {
  if (typeof value == undefined || value == null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true
}


const createUser=async function(req,res){
  try{
    let inputFrombody=req.body;
    let { name, email, phone, password } = inputFrombody;
    if (!(Object.keys(inputFrombody).length > 0)) { return res.status(400).send({ status: false, message: "Invalid request,Please provide some details" }) }
//name validation
if (!isValid(name)) { return res.status(400).send({ status: false, message: "Name is required" }) }
//email validation
if (!isValid(email)) { return res.status(400).send({ status: false, message: "Email-Id is required" }) }

if (!(/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]+)$/.test(email.trim()))) {
  return res.status(400).send({ status: false, message: "Email should be a valid email address" })
}

let checkEmail = await userModel.findOne({ email:email })
if (checkEmail) { return res.status(400).send({ message: "Email Already exist" }) }
//phone validation
if (!(/^[6-9]\d{9}$/.test(phone))) {
  return res.status(400).send({ status: false, message: "phone number should be valid number" })
}
let checkPhone = await userModel.findOne({ phone: phone })
if (checkPhone) { return res.status(400).send({ message: "phone Already exist" }) }
////password validation
if (!isValid(password)) return res.status(400).send({ status: false, msg: "Password is required" });
if (password.length < 8 || password.length > 15) return res.status(400).send({ status: false, msg: "Password length should be 8 to 15" });
//hasing password//saltRound=10 minimum level of encryption  
    inputFrombody.password=await bcrypt.hash(password,saltRound);
    let newUser=await userModel.create(inputFrombody)
    return res.status(201).send({status:true,msg:"user account created succesfully",DATA:newUser})

} catch(error){
  console.log(error)
  return res.status(500).send({status:false,msg:error.message})
}}

const logInUser= async function(req,res){
  try{
    let data=req.body;
    let {email,password}=data;
//validation
  if (!(Object.keys(data).length > 0)) { return res.status(400).send({ status: false, message: "Invalid request,Please provide details of an user" }) }
 //email validation
 if (!isValid(email)) { return res.status(400).send({ status: false, message: "Email-Id is required" }) }

 if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
   return res.status(400).send({ status: false, message: "Email should be a valid email address" })
 }
//password validation
if (!isValid(password)) return res.status(400).send({ status: false, msg: "Enter the valid Password" });
if (password.length < 8 || password.length > 15) return res.status(400).send({ status: false, msg: "Password length should be 8 to 15" });

  let login=await userModel.findOne({email:email})
  if(!login) return res.status(400).send({status:false,msg:"incorrect email"})
   let rightPwd = bcrypt.compareSync(password, login.password);
  if (!rightPwd) return res.status(400).send({ status: false, msg: "password is incorrect" });
  let token=jwt.sign(
    {
        userId:login._id,
        project:"library-management",
        organization:"A2D"
    },"A2DPROJECT"
  )
  res.header("a2d-key",token)
  return res.status(201).send({msg:"login successfull",TOKEN:token})
}
 catch(error){
  console.log(error)
  return res.status(500).send({status:false,msg:error.message})
}
}


module.exports.createUser=createUser;
module.exports.logInUser=logInUser;