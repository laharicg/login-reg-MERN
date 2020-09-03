const router = require("express").Router();

// router.get("/test", (req, res) => {
//   res.send("Hello! it is working");
// });

router.post("/register", async (req, res) => {
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
});

module.exports = router;
