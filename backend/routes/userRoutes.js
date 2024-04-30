const express = require("express");
const multer = require('multer');
const { registerUser, authUser,allUsers } = require("../controllers/userContorller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

//middleware for uploading the files
const upload = multer({ storage: multer.memoryStorage() })

router.post('/login',authUser);

router.route('/').post(upload.single('pic'),registerUser).get(verifyToken,allUsers)

module.exports = router;