const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const Deck = require("./Deck");
const userSchema = new Schema({
username: {
  type: String,
  required: true
 },
// lastname: {
//   type: String,
//   required: true
//  },
password : {
  type: String,
  required:true,
},
//  registerDate: {
//    type: Date,
//    required: true,
//    default: new Date()
//  },
 
});

userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

const User = mongoose.model("User", userSchema);
module.exports = User;