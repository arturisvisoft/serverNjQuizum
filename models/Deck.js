 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;


 

 const deckSchema = new Schema({
 
  title: {
   type: String,
   required: true
  },
 description: {
   type: String,
   required: true
  },  
creator:{
  type: mongoose.Schema.Types.ObjectId, 
  ref: 'User',
  required: true
 }
 });
 
 
 const Deck = mongoose.model("Deck", deckSchema);
 module.exports = Deck;