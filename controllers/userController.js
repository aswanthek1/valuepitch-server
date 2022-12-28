const userModel = require("../models/userModel");
const { validateLength, validateEmail } = require("../helpers/validation");
const jwt = require("jsonwebtoken");

module.exports = {
  ///register user
  register: async (req, res) => {
    try {
      const { name, email, dob, address } = req.body.values;
      const country = req.body.country;
      const check = await userModel.findOne({ email });
      if (check) {
        res.json({ message: "user already exists" });
      } else if (!validateEmail(email)) {
        res.status(400).json({ message: "Invalid email" });
      } else if (!validateLength(name, 3, 25)) {
        res.status(400).json({ message: "Invalid format" });
      } else if (!dob || !country || !address) {
        res.status(400).json({ message: "missing credentials" });
      } else {
        const newUser = await new userModel({
          name,
          email,
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

  ///get users
  getUsers: async (req, res) => {
    try {
      const allUsers = await userModel
        .find({ visibility: true })
        .sort({ createdAt: -1 });
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ message: "error found", error });
    }
  },

  ///delete details
  deleteDetails: async (req, res) => {
    try {
      const userId = req.body.userId;
      const deleteDetails = await userModel.updateOne(
        { _id: userId },
        { visibility: false }
      );
      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      console.log("erreor", error);
      res.status(500).json({ message: "Error found", error });
    }
  },

  ///edit details
  editDetails: async (req, res) => {
    try {
      const { name, email, dob, address, country, _id } = req.body;
      if (!validateEmail(email)) {
        res.status(400).json({ message: "Invalid email" });
      } else if (!validateLength(name, 3, 25)) {
        res.status(400).json({ message: "Invalid format" });
      } else if (!dob || !country || !address) {
        res.status(400).json({ message: "missing credentials" });
      } else {
        const update = await userModel.updateOne(
          { _id: _id },
          {
            name,
            email,
            dob,
            country,
            address,
          }
        );
        res.status(200).json({ message: "updated" });
      }
    } catch (error) {
      console.log("ereror", error);
      res.status(500).json({ message: "error found", error });
    }
  },
};
