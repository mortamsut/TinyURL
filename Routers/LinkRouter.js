import express  from "express";
import LinkController from '../controllers/LinkController.js'

const LinkRouter=express.Router();

LinkRouter.get('/',LinkController.getAllLinks);
LinkRouter.get('/:id',LinkController.getLinkById);
LinkRouter.post('/',LinkController.addLink);
LinkRouter.put('/:id',LinkController.updateLink);
LinkRouter.delete('/:id',LinkController.deleteLink);

export default LinkRouter;