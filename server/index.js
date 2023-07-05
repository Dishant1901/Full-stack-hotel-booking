import express from 'express';
import cors from "cors"
import bcrypt from "bcryptjs"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// importing files 
import Dbconnection from './DbConnection.js';
import UserModel from './models/userModel.js';
dotenv.config();

//
const bcryptSalt = bcrypt.genSaltSync(8)
//

const app = express();
const PORT =4141;

// middlewares
app.use(express.json());
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173',
}))

// DB connection 
Dbconnection();
// defining user model
const user=UserModel

app.get('/',(req, res)=>{res.json({sucess:true})})

// method: post
// URL : /register
// description : to register new user
app.post('/register', async(req, res)=>{
    const {name,email,password} = req.body;

    try{
        const newUser= await  user.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
    
        res.json({newUser})

    }catch(err){
        res.status(400).json(err)
    }
    
})

// method: post
// URL : /login
// description : to login registered user
app.post('/login',async(req, res)=>{
  const  {email,password} = req.body    

  try {
    const userDoc=await user.findOne({email})
    // if usser found => check if password is correct 
    if(userDoc){
        const passOk= bcrypt.compareSync(password,userDoc.password)
        if(passOk){
            res.status(200).json('password ok')   
        }
        else{
            res.status(422).json('password not ok')
        }
    } 
    else{
        res.json('not found')
    } 
    

  } catch (error) {
    alert("user not found")
  }
})


app.listen(PORT,()=>{
    console.log(`runninng on port ${PORT}`);
});