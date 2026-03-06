import User from "../models/user.js";

export function createUser(req, res) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    phone: req.body.phone,
    address: req.body.address,
  });
  user
    .save()
    .then(() => {
      res.json({
        message: "user added successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "user added failed",
      });
    });
}

export function getUser(req, res) {
  console.log(req.body);

  User.find()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch(() => {
      console.log("not find the user");
    });
}
