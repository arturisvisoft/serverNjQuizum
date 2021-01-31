const express = require('express');
const router = express.Router();

const Deck = require("../models/Deck");

// Get All decks

router.get("/", async (req, res) => {
    try {
      const deck = await Deck.find()
      res.json(deck)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });

router.get("/:id", getDeck, (req, res) => {
    res.json(res.deck);
});
  

//get user's decks
router.get("/user/:user", async (req, res ) => {
    try {
      const deck = await Deck.find({"creator":req.params.user});
      res.json(deck)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
});
    

  
router.post("/", async (req, res) => {
    const deck = new Deck({
      title: req.body.title,
      description: req.body.description,
      creator: req.body.creator,
    });
    try {
      const newDeck = await deck.save();
      res.status(201).json({ newDeck });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



//Delete

router.delete("/:id", getDeck, async (req, res) => {
    try {
      await res.deck.deleteOne();
      res.json({ message: "Deck has been deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

//get Deck middleware

async function getDeck(req, res, next) {
    let deck;
    try {
       deck = await Deck.findById(req.params.id);

      if (deck == null) {
        return res.status(404).json({ message: "Cannot find deck" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.deck = deck;
    next();
  }

  



module.exports = router;