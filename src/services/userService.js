const { readJSON, writeJSON } = require('../utils/fileHelper');

module.exports = class UserService {
    find(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await readJSON('users.json');
                if (users.length) {
                    let user = users.find(usr => usr.email == email && usr.password == password);
                    if (user) {
                        resolve(user);
                    } else {
                        reject("Invalid User");
                    }
                } else {
                    reject("User not found");
                }
            } catch (error) {
                reject(error.message)
            }
        })
    }
}