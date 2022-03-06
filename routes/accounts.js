// const express = require("express");
// const router = express.Router();
// const Account = require("../models/Account");
//Get All
// router.get("/", async (req, res) => {
//   try {
//     const accounts = await Account.find();
//     res.json(accounts);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// router.patch("/update/:postId", async (req, res) => {
//   try {
//     const updatedPost = await Account.updateOne(
//       { _id: req.params.postId },
//       {
//         $set: {
//           flag: req.body.flag,
//         },
//       }
//     );
//     res.json(updatedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// module.exports = router;
