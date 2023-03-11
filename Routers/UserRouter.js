import express  from 'express';
import UserController  from '../controllers/UserController.js';

const UserRouter=express.Router();

UserRouter.get("/",UserController.getAllUsers);
UserRouter.get("/:id",UserController.getUserById);
UserRouter.post("/",UserController.addUser);
UserRouter.put("/:id",UserController.updateUser);
UserRouter.delete("/:id",UserController.deleteUser);

export default UserRouter;
