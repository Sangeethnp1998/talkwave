const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

const accessChat = asyncHandler(async(req,res)=>{
    const { userId }= req.body;
    if(!userId){
        console.log('UserId not provided!')
    }

    let isChat = await Chat.find({
        isGroupChat : false,
        $and : [
            { users: { $elemMatch : { $eq: req.user._id } }},
            { users: { $elemMatch : { $eq: userId } }}
        ]
    }).populate("users","-password").populate("latestMessage");

    isChat = await User.populate(isChat,{
        path: "latestMessage.sender",
        select : "name pic email"
    });
    if(isChat.length > 0){
        res.send(isChat[0])
    }
    else{
        let chatData = {
            chatName : 'sender',
            isGroupChat : false,
            users: [req.user._id,userId]
        }

        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users","-password");
            res.status(200).send(fullChat)
        } catch (error) {
            res.status(400);
            throw new Error(error.message)
        }
        
    }
})

const fetchChats = asyncHandler(async(req,res)=>{
    try{
        const chats = await Chat.find({users: { $elemMatch: { $eq: req.user._id }}})
                            .populate("users","-password")  
                            .populate("groupAdmin","-password") 
                            .populate("latestMessage") 
                            .sort({updatedAt: -1})
            const chatsDetails = await User.populate(chats,{
                path:"latestMessage.sender",
                select: "name pic email"
            })
        res.status(200).send(chatsDetails)
    }
    catch(error){
        res.status(400);
        throw new Error(error.message)
    }
    
})

const createGroupChat =  asyncHandler(async(req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message : 'Please fill all the feilds'})
    }

    //converting stringified back to object (array)
    let users = req.body.users;

    if(users.length < 2){
        return res.status(400).send({message : 'Minimum 2 people required!'})
    }

    //adding the logged in user
    users.push(req.user)

    try {
        const chatObj = {
            chatName : req.body.name,
            isGroupChat :true,
            users: users,
            groupAdmin : req.user
        }
        const groupChat = await Chat.create(chatObj);
        const fullGroupChat = await Chat.findOne({_id : groupChat._id})
                                .populate("users","-password")
                                .populate("groupAdmin","-password")
        res.status(200).send(fullGroupChat)

    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})

const renameGroupChat = asyncHandler(async(req,res)=>{
    const { chatId, chatName } = req.body;

    try {
         const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName },{new :true})
                                .populate("users","-password")
                                .populate("groupAdmin","-password")
        res.status(200).send(updatedChat)
    } catch (error) {
         res.status(400);
        throw new Error(error.message)
    }
   
})

const addToGroup = asyncHandler(async(req,res)=>{
    const { chatId, userId } = req.body;

    try {
         const added = await Chat.findByIdAndUpdate(chatId, 
                        {
                            $push : { users : userId }
                        },
                        {
                            new :true
                        })
                        .populate("users","-password")
                        .populate("groupAdmin","-password")
        res.status(200).send(added)
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})

const removeFromGroup = asyncHandler(async(req,res)=>{
    const { chatId, userId } = req.body;

    try {
         const removed = await Chat.findByIdAndUpdate(chatId, 
                        {
                            $pull : { users : userId }
                        },
                        {
                            new :true
                        })
                        .populate("users","-password")
                        .populate("groupAdmin","-password")
        res.status(200).send(removed)
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})
module.exports = { accessChat , fetchChats,createGroupChat,renameGroupChat,addToGroup ,removeFromGroup }