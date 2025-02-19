import { getDb } from "../../config/mongodb.js";
import bcrypt from "bcrypt";
export default class UserModel {
    constructor(name, email, password, type) {
        this._id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }
    static signUp(body) {
        let { name, email, type, password } = body;
        let newUser = new UserModel(name, email, password, type);
        return newUser;
    }
    
    static signIn(filter) {
        return {
            email: filter
        };
    }
}

