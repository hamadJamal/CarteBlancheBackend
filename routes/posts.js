const express = require("express");
const { exists } = require("../models/CreateUserModel");
const router = express.Router();
const Post = require("../models/CreateUserModel");
//Get All
// router.get("/CurrentCharges", async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });
//Get Specific
// router.get("/CurrentCharges/:postId", async (req, res) => {
//   try {
//     const posts = await Post.findById(req.params.postId);
//     res.json(posts);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

//Post a JSON object
router.post("/register", async (req, res) => {
  const Data = req.body;
  const post = new Post({
    Username: Data.Username,
    Email: Data.Email,
    Password: Data.Password,
    Tasks: Data.Tasks,
  });
  try {
    const SavedPost = await post.save();
    res.json(SavedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/validate", async (req, res) => {
  const Data = req.body;
  if (!Data.Username || !Data.Password) {
    return res.status(400).json({ error: "Data NOT filled" });
  }
  try {
    const userExist = await Post.findOne({
      Username: Data.Username,
      Password: Data.Password,
    });

    if (userExist) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/tasks", async (req, res) => {
  const Data = req.body;

  try {
    const userData = await Post.findOne({
      Username: Data.Username,
    });

    res.json({ tasks: userData.Tasks });
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/tasks/add", async (req, res) => {
  const Data = req.body;
  const Task = Data.Task;

  try {
    const userData = await Post.findOne({
      Username: Data.Username,
    });

    const Tasks = userData.Tasks;

    Tasks.push(Task);

    try {
      const updatedPost = await Post.updateOne(
        { Username: Data.Username },
        {
          $set: {
            Tasks: Tasks,
          },
        }
      );
      res.json(updatedPost);
    } catch (err) {
      res.json({ message: err });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/tasks/delete", async (req, res) => {
  const Data = req.body;
  const Username = Data.Username;
  const TaskName = Data.TaskName;
  console.log(Username);
  try {
    const userData = await Post.findOne({
      Username: Data.Username,
    });

    const Tasks = userData.Tasks;
    let newTasks = [];
    Tasks.forEach((element) => {
      if (element.title == TaskName) {
        //do nothing
      } else {
        newTasks.push(element);
      }
    });

    try {
      const updatedPost = await Post.updateOne(
        { Username: Data.Username },
        {
          $set: {
            Tasks: newTasks,
          },
        }
      );
      res.json(updatedPost);
    } catch (err) {
      res.json({ message: err });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a speific post
// router.delete("/delete/:postId", async (req, res) => {
//   try {
//     const removedPost = await Post.remove({ _id: req.params.postId });
//     res.json(removedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

//Update a post
// router.patch("/update/:postId", async (req, res) => {
//   try {
//     const updatedPost = await Post.updateOne(
//       { _id: req.params.postId },
//       {
//         $set: {
//           Price: req.body.Price,
//           Currency: req.body.Currency,
//           Distance: req.body.Distance,
//           Time: req.body.Time,
//         },
//       }
//     );
//     res.json(updatedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

module.exports = router;
