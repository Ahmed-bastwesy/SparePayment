let productService = new(require("../services/productService"))();
let cartService = new(require("../services/cartService"))();

module.exports = class CartController {

    getUserCart(userId){
        return new Promise(async(resolve, reject) => {
            try {                
                resolve(true);
            } catch (error) {
                reject(error)
            }
        })
    }
}