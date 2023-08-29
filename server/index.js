import express, { response } from 'express';
import cors from "cors"
import bcrypt from "bcryptjs"
import mongoose from 'mongoose';
import Jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import imageDownloader from 'image-downloader'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import fs from 'fs';

// importing files 
import Dbconnection from './DbConnection.js';
import UserModel from './models/userModel.js';
import PlaceModel from './models/placesModel.js';
import BookingModel from './models/booking.js';
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
const photoMiddleware = multer({dest:'uploads/'})

// DB connection 
Dbconnection();
// defining user model
const user=UserModel
const place=PlaceModel
const booking = BookingModel

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(__dirname + '/uploads'))

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

// method: POST
// URL : /logout
// description : to logout  user
app.post('/logout',(req, res)=>{
    res.cookie('token','').json('user Logged Out')
    

})



// method: GET
// URL : /profile
// description : To login registered user
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
// URL : /upload
// description : To upload image by link
app.post('/upload', async(req,res)=>{
    const {link} = req.body;
    const newName= 'photo'+ Date.now()+'.jpg';

    await imageDownloader.image({
        url: link,
        dest: __dirname +'/uploads/'+newName,
    })
    // console.log(__dirname)
    res.json(newName)
    // const {link} =req.body

    // // res.json({dest:link, message: 'sucesss'})
    // console.log('working')

})


// method: POST
// URL : /uploadPhoto
// description : To upload image by button
app.post('/uploadPhoto', photoMiddleware.array('photos',10),(req,res) => {
   
    const uploadFiles=[]; // empty array 
    for(let i=0; i<req.files.length; i++)
    {
        const {path,originalname}= req.files[i];
        const parts = originalname.split('.'); // taking file extension
        const ext= parts[parts.length-1];
        const newPath = path + '.' +ext;

        fs.renameSync(path, newPath);

        uploadFiles.push(newPath.replace('uploads\\',''));

        // console.log( ' this is being sent as response....',uploadFiles, ' this is req.files....', req.files);
    }
    res.json(uploadFiles);
})


// method: POST
// URL : /places
// description : To save place Form data
app.post('/places',async(req,res) => {
    const{token} = req.cookies;
    const {
        title,address,addedPhotos,description,price,
        perks,extraInfo,checkIn,checkOut,maxGuest,
      } = req.body;
      //
      
    Jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if(err) throw err;

      const placeDoc= await place.create({
            owner: userData.id,title,address, 
            photos:addedPhotos,description,
            price,perks,extraInfo,
            checkIn,checkOut,maxGuest,

        })
        console.log(placeDoc)
        res.json(placeDoc)
    })
    
})

// method: GET
// URL : /places
// description : To get all places ownerd by user
app.get('/user-places',(req,res)=>{
    const {token} = req.cookies;

    Jwt.verify(token,jwtSecret,{},async (err,UserData)=>{
       const {id}  = UserData;

        res.json(await place.find({owner: id})) // ye dyan rkhna , ange bht kam ayega tumko

    })
})

// method: GET
// URL : /places:id
// description : To get  places by id
// Parameter : id
app.get('/places/:id',async (req,res)=>{
    const {id} = req.params;

    res.json(await place.findById(id));
})

// method: PUT
// URL : /places
// description : To update  places by id
// Parameter : NONE
app.put('/places',async (req,res)=>{
    const {token} = req.cookies;

    const { id,title,address,addedPhotos,description,price,
        perks,extraInfo,checkIn,checkOut,maxGuest,
      } = req.body;

      Jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw err;
        const placeDoc= await place.findById(id);
        if(userData.id === placeDoc.owner.toString()) {

            placeDoc.set ({title,address,photos:addedPhotos,
                description,price,
                perks,extraInfo,checkIn,checkOut,maxGuest,
              });

            placeDoc.save();
            res.json('ok')
        } 
      })
})

// method: GET
// URL : /places
// description : To get all places in DB
// Parameter : NONE
app.get('/places',async(req, res) => {
    res.json(await place.find())
})

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        Jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    });
  }

// method: POST
// URL : /bookings'
// description : To Book a place by user
// Parameter : NONE
app.post('/bookings',async(req, res) => {
    const userData = await getUserDataFromReq(req);
  const {
    place,checkIn,checkOut,numberOfGuests,name,phone,price,
  } = req.body;
  booking.create({
    place,checkIn,checkOut,numberOfGuests,name,phone,price,
    user:userData.id,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
})

// method: GET
// URL : /bookings'
// description : To Book a place by user
// Parameter : NONE
app.get('/bookings', async(req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await booking.find({user: userData.id}).populate('place')); // this is very bindas bidu
})



app.listen(PORT,()=>{
    console.log(`runninng on port ${PORT}`);
});