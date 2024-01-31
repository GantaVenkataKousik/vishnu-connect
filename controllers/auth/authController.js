import { hashPassword,comparePassword } from "../../helpers/authHelper.js";
import path from 'path';
import userModel from "../../models/auth/userSchema.js";
const secretKey = "fjsdfh849jkaslfjd";

export const loginController  =  async(req,res) =>  {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        const user = await userModel.findOne({email: email});
        if(!user) {
            console.log("User not found")
            return res.status(300).send({
                success:false,
                message:"email does not exist",
            })
        }

        // const match = await comparePassword(password , user.password);
        if(password !== user.password) {    
            return res.status(500).send({
                success:false,
                message:"Password not matched"
            })
        }
        else{
                res.redirect(`http://localhost:9002/api/v2/vishnu/home?userid=${user._id}`);       
            }
        }
    catch(err) {
        console.error(err);
        return res.status(500).send({
            success:false,
            message:"Error in Registration",
            err
        })
    }
}

export const registerController = async(req,res) => {
    try{
        const {name,email,password,profileUrl} = req.body;
        const existinguser = await userModel.findOne({ email: email });
        if (existinguser) {
            return res.status(200).send({ message: "Email already registered!Try to register with an another email"});
        } else {
            try {
                
                    // const hashedPassword = await hashPassword(password);
                    const newuser = new userModel({
                        email,
                        name,
                        profileUrl,
                        password
                    });
                    await newuser.save();
                    res.render('auth/login');
            }
            catch (err) {
                console.log(err);
                return res.status(200).send({ 
                    success: false,
                    message: "Registration failed"
                 });
            }

        }
    } 
    catch(err){
        console.error(err);
        return res.status(500).send({
            success:false,
            message:"Error in Registration",
            err
        })
    }
}


export const testController = async(req,res) => {
    try{
        return res.status(200).send("Protected Routes")
    }
    catch(err){
        console.error(err);
        return res.status(500).send({
            success:false,
            message:"Error in Registration",
            err
        })
    }
}
