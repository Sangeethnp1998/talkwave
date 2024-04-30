const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {accessChat, fetchChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup} = require('../controllers/chatController')

const router = express.Router();

router.post('/',verifyToken,accessChat);
router.get('/',verifyToken,fetchChats);
router.post('/group',verifyToken,createGroupChat);
router.put('/rename',verifyToken,renameGroupChat);
router.put('/groupadd',verifyToken,addToGroup);
router.put('/groupremove',verifyToken,removeFromGroup);


module.exports = router;