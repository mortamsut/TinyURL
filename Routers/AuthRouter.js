import AuthController from "../controllers/AuthController.js";
import express  from "express"

const AuthRouter= express.Router();

AuthRouter.get('/:name',AuthController.signIn);
AuthRouter.post('/', AuthController.signUp);

export default AuthRouter