
const User = require('./User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')

const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id}, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
  };
exports.signin = async(req,res) => {
    const user = await User.findOne({ email: req.body.email })
    // console.log(user)
      if (user) {
        const isPassword =await user.authenticate(req.body.password)
        // console.log(isPassword)
        if (isPassword) {
          const token = generateJwtToken(user._id);
          const { firstName, lastName, email } = user;
          res.status(200).json({
            token,
            user: {
              firstName,
              lastName,
              email,
            },
          });
        } else {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
  }

exports.signup = async(req,res) => {
   const user = await User.findOne({ email: req.body.email })
      if (user)
        return res.status(400).json({
          error: "User already exists",
        });
  
      const { firstName, lastName, email, password } = req.body;
      const hash_password =await bcrypt.hash(password,10)
  
      const _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
        userName:shortid.generate()
      });
      const newuser =await _user.save()
        if (newuser) {
          const token = generateJwtToken(newuser._id);
          const { _id, firstName, lastName, email,fullName } = newuser;
          return res.status(201).json({
            token,
            user: { _id, firstName, lastName, email,fullName },
          });
        }
  }