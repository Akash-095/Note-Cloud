const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'WeAreFighter$';

//create a user using: POST "/api/auth/". Doesn't require Auth. No login required
router.post('/createuser',
  [
    body('name', "Enter a Valid Name").isLength({ min: 4 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Minimum password length must be 8').isLength({ min: 8 })
  ],
  async (req, res) => {
    // if there are errors, return Bad request and error
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }


    //check whether the user with same email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Sorry a user with this email already exists" })
      }
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);

      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);


      //res.json(user)
      success =true;
      res.json({success, authtoken })

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured")
    }

  })

//Authenticate a user using: POST:"api/auth/login"
router.post('/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
  ],
  async (req, res) => {
    //for error detection
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success, error: "Please enter valid credentials" });
      }

      const passcompare = await bcrypt.compare(password, user.password);
      if (!passcompare) {
        return res.status(400).json({success, error: "Please enter valid credentials" });
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken })
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occured")
    }

  });

//Get loggedin user details using: POST: "/api/auth/getuser". login required
router.post('/getuser', fetchuser ,
  async (req, res) => {
try {
 let  userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal Server Error Occured");
}
  });
module.exports = router