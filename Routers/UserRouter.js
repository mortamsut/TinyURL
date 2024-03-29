import express  from 'express';
import UserController  from '../controllers/UserController.js';

const UserRouter=express.Router();

UserRouter.get("/",UserController.getLinks);
// UserRouter.get("/:name",UserController.getUserById);
// UserRouter.post("/",UserController.addUser);
//UserRouter.post("/:id",UserController.addUserLink);
//UserRouter.get("/:name",UserController.getLinkById);
UserRouter.put("/:id",UserController.updateUser);
UserRouter.delete("/:id",UserController.deleteUser);

export default UserRouter;
