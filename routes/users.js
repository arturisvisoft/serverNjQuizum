const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require("../models/User");// Get All Route



router.get("/", async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });// Get One Route


router.get("/:id", getUser, (req, res) => {
    res.json(res.user);
  });
  
  // Create One Route
router.post("/register", async (req, res) => {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    try {
      const newUser = await user.save();
      res.status(201).json({ newUser });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.post('/login', async (req, res) =>{
    console.log("login request")
     const userDB = await User.findOne({ "username": req.body.username }, (erro, userDB)=>{
      if (erro) {
        return res.status(500).json({
           ok: false,
           err: erro
        })
     }
      })
      console.log(req.body)
      if (!userDB) {
        return res.status(400).json({
          ok: false,
          err: {
              message: "Usuario o contraseña incorrectos"
          }
      })
    }
         if (!bcrypt.compareSync(req.body.password, userDB.password)){
           return res.status(400).json({
              ok: false,
              err: {
                message: "Usuario o contraseña incorrectos"
              }
           });
        }
        let token1 = jwt.sign({
            username: userDB,
        }, process.env.SEED_AUTENTICACION, {
        expiresIn: "1d"
        })

        res.json({
        ok: true,
        user: userDB,
        token1,
        })
  });




//Patch One
// // router.patch("/:id", getUser, async (req, res) => {
// //     if (req.req..username != null) {
// //       res.user.username = req.body.username;
// //     }
// //     if (req.body.lastname != null) {
// //       res.user.lastname = req.body.lastname;
// //     }
// //     try {
// //       const updatedUser = await res.user.save();
// //       res.json(updatedUser);
// //     } catch (err) {
// //       res.status(400).json({ message: err.message });
// //     }
// //   });
  
router.delete("/:id", getUser, async (req, res) => {
    try {
      await res.user.deleteOne();
      res.json({ message: "User has been deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

//getUser middleware
async function getUser(req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "Cannot find User" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
  }

module.exports = router;