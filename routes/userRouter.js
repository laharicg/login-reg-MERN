const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
// router.get("/test", (req, res) => {
//   res.send("Hello! it is working");
// });

router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, displayName } = req.body;

    //validate

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Enter required fields" });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "Enter password with atleast 5 characters!" });

    if (password != passwordCheck)
      return res.status(400).json({ msg: "Passwords does not match!" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ msg: "Account already exists!" });
    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //console.log(passwordHash);
    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
