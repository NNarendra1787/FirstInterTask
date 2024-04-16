const { RegisterUser, LoginUser } = require("../Controller/userController");

const userRoutes = require("express").Router();

userRoutes.post("/register", RegisterUser);
userRoutes.post("/login", LoginUser);

module.exports = userRoutes;