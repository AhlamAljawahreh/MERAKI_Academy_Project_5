const express = require("express");

const { createNewUser ,updateProfilePhoto,getInfoUser} = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/", createNewUser);
usersRouter.put("/image/:id",updateProfilePhoto)
usersRouter.get("/:id/info",getInfoUser)
module.exports = usersRouter;
