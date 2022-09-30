const jwt=require("jsonwebtoken");
const bookModel=require("../models/bookModel");
const bookIssuedModel=require("../models/bookIssuedModel");

//authentication logic for admin
const authenticationForAdmin = function (req, res, next) {
    try {
        let token = req.headers["a2d-key"]
        if (!token) {
            return res.status(400).send({ status: false, msg: "token must be present" });
        }
        let decodedToken = jwt.verify(token, "A2DPROJECT");
        
        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "token is invalid" });
        }
        next();
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}
//authentication logic for user
const authenticationForUser= function(req,res,next){
    try{
        let token=req.headers["a2d-key"]
        if(!token){
            return res.status(400).send({status:false,msg:"token must be present"});

        }
        let decodedToken=jwt.verify(token,"A2DPROJECT")
        if(!decodedToken) {return res.status(400).send({status:false,msg:"token is invalid"})}
        next();
    }
    catch(error){
        console.log(error)
        return res.status(500).send({msg:error.message})
    }
}

//authorization logic for admin on bookModel


const authorizationOnbookModel = async function (req, res, next) {
    try {
        let token = req.headers["a2d-key"];
        let decodedtoken = jwt.verify(token, "A2DPROJECT")

        let bookId = req.params.bookId
        if ( bookId ) {
            let adminId = await bookModel.find({ _id: bookId }).select({ adminId: 1, _id: 0 })
            adminId = adminId.map(x => x.adminId)

            if (decodedtoken.adminId != adminId) return res.status(403).send({ status: false, msg: "You haven't right to perform this task" })
        }
        else {
            let adminId = req.query.adminId
            if ( !adminId )  return res.status(400).send({error : "Please, enter adminId"})
            if (decodedtoken.adminId != adminId) return res.status(403).send({ status: false, msg: "You haven't right to perform this task" })
        }
        next()
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}

//authorization logic for admin on bookIssuedModel
const authorizationOnbookIssuedModel = async function (req, res, next) {
    try {
        let token = req.headers["a2d-key"];
        let decodedtoken = jwt.verify(token, "A2DPROJECT")

        let bookIssuedId = req.params.bookIssuedId
        if ( bookIssuedId ) {
            let adminId = await bookIssuedModel.find({ _id: bookIssuedId }).select({ adminId: 1, _id: 0 })
            adminId = adminId.map(x => x.adminId)

            if (decodedtoken.adminId != adminId) return res.status(403).send({ status: false, msg: "You haven't right to perform this task" })
        }
        else {
            let adminId = req.query.adminId
            if ( !adminId )  return res.status(400).send({error : "Please, enter adminId"})
            if (decodedtoken.adminId != adminId) return res.status(403).send({ status: false, msg: "You haven't right to perform this task" })
        }
        next()
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}
module.exports.authenticationForAdmin = authenticationForAdmin;
module.exports.authenticationForUser = authenticationForUser;
module.exports.authorizationOnbookIssuedModel=authorizationOnbookIssuedModel;
module.exports.authorizationOnbookModel=authorizationOnbookModel;