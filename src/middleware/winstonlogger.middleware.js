import winston from 'winston';

let loggerConfiguration = winston.createLogger({
    level: 'http',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'log.txt' })
    ]
});
export default async (req, res, next) => {
    let data = req.body;
    let meta = {
        user_id : req.u_Id,
        user_Type : req.u_type,
        url : req.url
    }
    await loggerConfiguration.http(data,meta);
    next();
}