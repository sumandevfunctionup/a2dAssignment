const express=require('express');
const route=express.Router();
const adminController=require("../controllers/adminController")
const bookController=require('../controllers/bookController');
const userController=require("../controllers/userController");
const bookIssuedController=require('../controllers/bookIssuedController');
const mw=require("../mw/mw");

//admin api
route.post('/createAdmin',adminController.createAdmin)
route.post('/login',adminController.loginAdmin)
//book api
route.post("/createBook",mw.authenticationForAdmin,mw.authorizationOnbookModel,bookController.createBook);
route.get("/ListOfAllBooks",mw.authenticationForAdmin,mw.authenticationForUser,bookController.getAllBooks);
route.get("/totalBooks",mw.authenticationForAdmin,mw.authenticationForUser,bookController.totalBooks);
route.get("/getBookDetails/:name",mw.authenticationForAdmin,mw.authenticationForUser,bookController.getBooksDetails);
route.put('/updatebook/:bookId',mw.authenticationForAdmin,mw.authorizationOnbookModel,bookController.updateBook);
route.delete("/deleteBook/:bookId",mw.authenticationForAdmin,mw.authorizationOnbookModel,bookController.deleteBook);
//user api
route.post("/createUser",userController.createUser);
route.post("/logInUser",userController.logInUser); 
//book issue api
route.post("/newIssue",mw.authenticationForAdmin,mw.authorizationOnbookIssuedModel,bookIssuedController.bookIssue);
route.put("/updateIssuedDoc/:bookIssueId",mw.authenticationForAdmin,mw.authorizationOnbookIssuedModel,bookIssuedController.updateBookIssueDoc);
route.get("/getIssuedBookList",mw.authenticationForAdmin,mw.authorizationOnbookIssuedModel,bookIssuedController.getAllIssuedList);
route.get("/bookIssuedList/:userId",mw.authenticationForAdmin,mw.authenticationForUser,bookIssuedController.getBookIssueById);

module.exports=route;         