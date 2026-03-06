import User from "../models/user.js";
import bcrypt from "bcrypt";

export function createUser(req, res) {
  const hashpassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword,
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

export function loginUser(req, res) {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user == null) {
        res.json({
          message: "user not found",
        });
      } else {
        const ispasswordMatching = bcrypt.compareSync(
          req.body.password,
          user.password,
        );
        if (ispasswordMatching) {
          res.json({
            message: "login successful",
          });
        } else {
          res.json({
            message: "login failed",
          });
        }
      }
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
}
