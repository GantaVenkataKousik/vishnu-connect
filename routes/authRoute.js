import express from 'express';
import {registerController,loginController,testController} from  '../controllers/auth/authController.js';


//router object
const router = express.Router();

//routing 
  //REGISTER
router.post("/register",registerController);

//LOGIN
router.post("/login",loginController);

router.get("/login",(req,res) => {
    res.render("auth/login");
})

router.get("/register",(req,res) => {
    res.render("auth/register");
})


export default router;