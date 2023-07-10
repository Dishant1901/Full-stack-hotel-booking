import express from 'express';
import cors from "cors"
import bcrypt from "bcryptjs"
import mongoose from 'mongoose';
import Jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// importing files 
import Dbconnection from './DbConnection.js';
import UserModel from './models/userModel.js';
dotenv.config();

//
// authentication and authorization keys
const bcryptSalt = bcrypt.genSaltSync(8)
const jwtSecret= 'qweFffs87*&hjsf'
//

const app = express();
const PORT =4141;

// middlewares
app.use(cookieParser())
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

// method: POST
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

// method: POST
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
            // jwt
            Jwt.sign({
                email:userDoc.email,
                id:userDoc._id,
            },jwtSecret,{},(err,token) => {
                if(err) throw err;

                res.cookie('token',token).json(userDoc)   

            })
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

// method: GET
// URL : /profile
// description : to login registered user
app.get('/profile',(req,res)=>{
    const{token} =req.cookies

    if(token){
        Jwt.verify(token,jwtSecret,{},async(err,userData)=>{
            if (err) throw err;
            const {name,email,_id}= await user.findById(userData.id)
            res.json({name,email,_id})

        })
    }else{
        res.json(null).status(400)
    }
})

// method: POST
// URL : /logout
// description : to logout  user
app.post('/logout',(req, res)=>{
    res.cookie('token','').json('user Logged Out')
    

})


app.listen(PORT,()=>{
    console.log(`runninng on port ${PORT}`);
});