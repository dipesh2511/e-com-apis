import multer from "multer"
import path from 'path';
let storageConfiguration = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(path.resolve(),'public','resume'));
    },
    filename:(req,file,cb)=>{
        let date = Date.now();
        cb(null,`${date}_${file.originalname}`);
    }
});
let upload = multer({storage:storageConfiguration});
export default upload;