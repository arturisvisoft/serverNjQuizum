const express = require('express');
const router = express.Router();

const Question = require("../models/Question");

// Get All Route

router.get("/", async (req, res) => {
    try {
      const question = await Question.find()
      res.json(question)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });

//Get pregutas por mazos

router.get("/deck/:deck", async (req, res ) => {
  try {
    const question = await Question.find({"deck":req.params.deck});
    res.json(question)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

//Get pregutas por usuario util en un futuro

router.get("/user/:user", async (req, res ) => {
    try {
      const question = await Question.find({"creator":req.params.user});
      res.json(question)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });  
  
  // Get One Route
  
router.post("/", async (req, res) => {
    const question = new Question({
      description: req.body.description,
      answer: req.body.answer,
      dificulty : req.body.dificulty,
      deck: req.body.deck,
      creator:req.body.creator,
    });
    try {
      const newQuestion = await question.save();
      res.status(201).json({ newQuestion });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });




//Delete

router.delete("/:id", getQuestion, async (req, res) => {
    try {
      await res.question.deleteOne();
      res.json({ message: "Question has been deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

//getQuestion middleware
async function getQuestion(req, res, next) {
    let question;
    try {
       question = await Question.findById(req.params.id);

      if (question == null) {
        return res.status(404).json({ message: "Cannot find Mazo" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.question = question;
    next();
  }

  


module.exports = router;