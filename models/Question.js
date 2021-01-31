const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({


description: {
  type: String,
  required: true
 },
 answer: {
    type: String,
    required: true
   },
//Para futuro uso
dificulty: {
    type: String,
    required: false
   },
deck:{
  type: mongoose.Schema.Types.ObjectId, 
  ref: 'Deck',
  required:true
},

//Puede ser util en un futuro
creator:{
  type: mongoose.Schema.Types.ObjectId, 
  ref: 'User',
  required: false
 },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;