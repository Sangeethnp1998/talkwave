const asyncHandler = require('express-async-handler')
const moment = require('moment');
const { ref,getDownloadURL,uploadBytesResumable } = require('firebase/storage');
const User = require('../models/userModel');
const { generateToken } = require('../common/config/auth');

const storage = require('../common/config/firbase');

const registerUser =  asyncHandler(async (req,res) =>{
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the fields");
    }

    const userExists = await User.findOne({
        email 
    })
    if(userExists){
        res.status(400);
        throw new Error('User already exists')
    }

    const userObj = {
            name,
            email,
            password,
    }
    if(req.file){
            const now = moment();

            const storageref = ref(storage,`files/${req.file.originalname}-${now}`);

            const metadata = {
                contentType : req.file.mimetype
            }

            //upload file in bucket storage 
            const snapshot = await uploadBytesResumable(storageref,req.file.buffer,metadata)
            //uploadBytesResumable used for controlling the progress of uploading like pause , resume 

            dowloadURL = await getDownloadURL(snapshot.ref);
            userObj.pic = dowloadURL
    }
    
    const user = await User.create(userObj)
    

    if(user){
        res.status(201).json({
            _id :user.id,
            name:user.name,
            email:user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error('Failed to create the user')
    }
})

const authUser = asyncHandler(async (req,res) => {
    const { email,password } = req.body;
    const user = await User.findOne({email});

    if(user && await user.matchPassword(password)){
        res.status(200).json({
            _id :user.id,
            name:user.name,
            email:user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401).json({
            message : 'Unauthorized'
        });
    }
})

const allUsers = asyncHandler(async(req,res)=>{

    const keyword = req.query.search ? 
        {
            $or:[
                { name : { $regex: new RegExp("^" + req.query.search, "i") } },
                { email: { $regex: new RegExp("^" + req.query.search, "i") } },
            ]
        }
      : {}
   
    const users = await User.find(keyword).find({_id :{ $ne :  req.user._id}});
    res.status(201).send(users)
})
module.exports = { registerUser ,authUser , allUsers}