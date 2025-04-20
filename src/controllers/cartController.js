let productService = new(require("../services/productService"))();
let cartService = new(require("../services/cartService"))();

module.exports = class CartController {

    list(user){
        return new Promise(async(resolve, reject) => {
            try {        
                let products = await cartService.list(user.id);
                resolve(products);
            } catch (error) {
                reject(error)
            }
        })
    }
    calcPrice(products){
        return products.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
            0,
          )  
    }
    getUserCart(user){
        return new Promise(async(resolve, reject) => {
            try {        
                let products = await this.list(user);
                let totalPrice = this.calcPrice(products);
                resolve({products :products, totalPrice});
            } catch (error) {
                reject(error)
            }
        })
    }
    removeProduct(user,productId){
        return new Promise(async(resolve, reject) => {
            try {        
                let products = await this.list(user);
                let filteredProducts = products.filter(prod => prod.productId !=productId);
                await cartService.update(filteredProducts);
                let totalPrice = this.calcPrice(filteredProducts);
                resolve({products :filteredProducts, totalPrice});
            } catch (error) {
                reject(error)
            }
        })
    }
}