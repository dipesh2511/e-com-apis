import jwt from 'jsonwebtoken';

export default (req,res,next)=>{
    // check if the token is present on the client request
    let authHeader = req.get('authorization');
    if(!authHeader){
        res.status(401).send("First logIn");
    }else{
        try{
            let result = jwt.verify(authHeader,process.env.JWT_KEY);
            req.u_Id = result.u_Id;
            req.u_type = result.u_type;
            req.token = result;
        }catch(err){
            res.status(401).send(err);
        }
        next();
    }
}