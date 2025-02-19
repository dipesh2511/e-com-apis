export default class ApplicationLevelError extends Error{
    constructor(message,code){
        super(message);
        this.code=code;
    }
}