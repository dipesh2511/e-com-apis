import fs from 'fs';
import path from 'path'
async function log(logdata) {
    let fspromise = fs.promises;
    try {
        let i = 0;
        let date = Date().toString();
        logdata =`${++i} ${date} ${logdata}\n` 
        await fspromise.appendFile(path.join(path.resolve('log.txt')), logdata);
    } catch (err) {
        console.log(err);
    }
}

export default async (req, res, next) => {
    
    let data = JSON.stringify(req.body);
    console.log(data)
    await log(data); 
    next();
}