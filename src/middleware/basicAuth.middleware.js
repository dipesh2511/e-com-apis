import UserModel from "../Features/user/model/user.model.js";

export default (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if(!authHeader){
        res.status(401).send("Login FIrst")
    }else{

        let base64Credential = authHeader.replace('Basic',' ');
        let decodeCredential = Buffer.from(base64Credential,'base64').toString("utf8");
        let cred = decodeCredential.split(':');
        let Users = UserModel.getAll();
        let result = Users.find((user)=>{
            return user.email== cred[0] && user.password == cred[1] 
        }) 
        console.log(result)
        if(result){
            next()
        }else{
            res.status(401).send("login again");
        }
    }
}
