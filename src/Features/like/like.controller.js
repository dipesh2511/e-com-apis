import ApplicationLevelError from "../../dynamicerror/applicationlevelerror.js";
import LikeRepository from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async postLike(req, res, next) {
    try {
      let { id, type } = req.body;
      let likable = ["category", "products"];
      let user_id = req.u_Id;
      if (!likable.includes(type))
        throw new ApplicationLevelError(
          `Put approprirate type , This '${type}' is not a appropriate type`,
          404
        );

      if (type == "products") {
        await this.likeRepository.likeProduct(user_id, id);
      } else {
        await this.likeRepository.likeCategory(user_id, id);
      }
      res.status(200).send(`Entered type ${type} is Liked`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllLikes(req, res, next) {
    let { type } = req.body;
    if (!type ) {
      throw new ApplicationLevelError(
        `Please provide type in request body`,
        404
      );
    }
    try {
      let result = await this.likeRepository.getAllLikes(type);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  
  async getUserLikes(req, res, next) {
    try {
      let result = await this.likeRepository.getUserLikes(req.u_Id);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }


}
