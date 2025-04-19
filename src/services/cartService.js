const { readJSON, writeJSON } = require('../utils/fileHelper');

module.exports = class CartService {
    list(){
        return new Promise(async(resolve, reject) => {  
            try {                
                const carts = await readJSON('carts.json');
                resolve(carts.length ? carts : []);
            } catch (error) {
                reject(error.message)
            }          
        })
    }
}