import './env.js'


import express from 'express';
import path from 'path';
import session from 'express-session';
import productRouter from './src/Features/product/product.router.js';
import userRouter from './src/Features/user/user.router.js';
import cartRouter from './src/Features/cart/cart.router.js';
import orderRouter from './src/Features/order/order.router.js';
import swagger from "swagger-ui-express";
import apidocs from "./swagger.json" assert {type: 'json'};
import corsConfiguration from './src/middleware/cors.configuration.js';
import cors from 'cors';
import loggerMiddleware from './src/middleware/logger.middleware.js';
import winstonloggerMiddleware from './src/middleware/winstonlogger.middleware.js';
import jwtMiddleware from './src/middleware/jwt.middleware.js';
import databaseConnection from './src/config/mongodb.js'
import databaseConnectionMongoose from './src/config/mongoose.config.js'
import ApplicationLevelError from './src/dynamicerror/applicationlevelerror.js';
import likeRouter from './src/Features/like/like.router.js'
// middlewares imports

// used for basic aunthentication
// import basicAuthMiddleware from './src/middleware/basicAuth.middleware.js';

let server = express();
server.use(cors(corsConfiguration))


server.use(session({
    secret: "Secret Key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))
//cors policy 
// server.use((req,res,next)=>{
//     res.set('Access-Control-Allow-Origin','*');
//     res.set( 'Access-Control-Allow-Headers','*');
//     res.set( 'Access-Control-Allow-Methods','*');

//     if(req.method == "OPTIONS"){
//         res.sendStatus(200);
//     }
//     next()
// })

// Allow all origins and methods
server.options('*', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.sendStatus(200);
});

// Other middleware or routes can follow



// middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());


// manually made logger middlewar
// server.use(loggerMiddleware)

// winston logger middleware
server.use(express.static(path.join(path.resolve('public', 'html'))))
server.use("/api-docs", swagger.serve, swagger.setup(apidocs));
server.use(express.static(path.join(path.resolve(), 'public')));


// middleware for checking the address and routing it for the file where its router is present
server.use('/api/product', jwtMiddleware, winstonloggerMiddleware, productRouter);
server.use('/api/cart', jwtMiddleware, winstonloggerMiddleware, cartRouter);
server.use('/api/order',jwtMiddleware,winstonloggerMiddleware,orderRouter);
server.use('/api/like',jwtMiddleware,winstonloggerMiddleware,likeRouter);
server.use('/api/user', userRouter);


server.use((err, req, res, next) => {
    console.log("error handler has triggered");
    if(err instanceof ApplicationLevelError){
        res.status(err.code).send(err.message);
    }
    res.status(500).send("internal sever error")
})


// default message if no above routes matches 
server.use((req, res) => {
    console.log("api redirected")
    res.status(404).redirect('/api-docs');
})

// listen function of port
server.listen(3200, async() => {
    // databaseConnection();
    await databaseConnectionMongoose();
    console.log("server is listning on port 3200");
})