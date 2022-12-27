const userModel = require("../models/userModel");
const {
  validateLength,
  validateEmail,
  validteDob,
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, dob, country, address } = req.body;
      const check = await userModel.findOne({ email });
      if (check) {
        res.status(400).json({ message: "user already exists" });
      } else if (!validateEmail(email)) {
        res.status(400).json({ messag: "Invalid email" });
      } else if (!validateLength(name, 3, 12)) {
        res.status(400).json({ message: "Invalid format" });
      } else if (!validateLength(password, 3, 12)) {
        res.status(400).json({ message: "Invalid format" });
      }
      // else if(!validteDob(dob)){
      //     res.status(400).json({message:'Invalid format dob'})
      // }
      else if (!dob || !country || !address) {
        res.status(400).json({ message: "missing credentials" });
      } else {
        const bcryptedPassword = await bcrypt.hash(password, 12);
        const newUser = await new userModel({
          name,
          email,
          password: bcryptedPassword,
          dob,
          country,
          address,
        });
        newUser.save();
        const token = jwt.sign(
          { _id: newUser._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({ message: "registerd user", newUser, token });
      }
    } catch (error) {
      res.status(500).json({ message: "error found", error });
    }
  },
};
