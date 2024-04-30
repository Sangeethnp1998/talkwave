const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }
},
{
        timestamps:true
}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// it will do the hashing before saving if the data is modified
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  //await should be here inorder to hash 
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User",userSchema);

module.exports = User