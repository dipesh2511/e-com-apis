export default (req, res, next) => {
    if(req.u_type == 'buyer'){
        next();
    }else{
        res.status(401).send("Un authorized access")
    }
}