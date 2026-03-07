import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req, res) {
  if (req.user == null) {
    res.status(404).json({
      message: "please login and try again",
    });
    return;
  }

  if (req.user.role != "admin") {
    res.status(401).json({
      message: "you must be an admin to create a student",
    });
    return;
  }

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
      res.status(200).json({
        message: "user added successfully",
      });
    })
    .catch(() => {
      res.status(400).json({
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
        res.status(404).json({
          message: "user not found",
        });
      } else {
        const ispasswordMatching = bcrypt.compareSync(
          req.body.password,
          user.password,
        );
        if (ispasswordMatching) {
          const token = jwt.sign(
            {
              name: user.name,
              email: user.email,
              role: user.role,
              phone: user.phone,
              address: user.address,
              isEmailVerified: user.isEmailVerified,
            },
            "jwt-secret",
          );
          res.status(200).json({
            message: "login successful",
            token: token,
          });
        } else {
          res.status(400).json({
            message: "login failed",
          });
        }
      }
    })
    .catch((error) => {
      res.status(404).json({
        message: error,
      });
    });
}

export function isAdmin(req) {
  if (req.user == null) {
    return false;
  }
  if (req.user.role != "admin") {
    return false;
  }

  return true;
}
