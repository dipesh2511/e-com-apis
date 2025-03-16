import express from "express";
import LikeController from "./like.controller.js";

let likeRouter = express.Router();
let likeController = new LikeController();
likeRouter.post("/", likeController.postLike.bind(likeController));
likeRouter.post("/all", likeController.getAllLikes.bind(likeController));
likeRouter.get("/", likeController.getUserLikes.bind(likeController));
export default likeRouter;
