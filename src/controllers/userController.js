let userService = new(require("../services/userService"))();
var jwt = require('jsonwebtoken');

module.exports = class UserController {
    async login(email,password){
        return new Promise((resolve, reject) => {
            userService.find(email,password).then(user =>{
                const token = jwt.sign(user, "Secret");
                resolve(token);
            }).catch(error=>{
                reject(error)
            })
        })
    }
}