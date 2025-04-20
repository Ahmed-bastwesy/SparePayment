let productService = new(require("../services/productService"))();
let cartService = new(require("../services/cartService"))();

module.exports = class ProductController {
    list(){
        return new Promise((resolve, reject) => {
            productService.list().then(products =>{
                resolve(products);
            }).catch(error=>{
                reject(error)
            })
        })
    }
    create(data){
        return new Promise(async(resolve, reject) => {
            try {                
                let products = await this.list();
                if(products.length){
                    let product = products.find(prod => prod.productId == data.productId);
                    if(product){
                        reject("Product ID is already Exist")
                        return;
                    }
                }
                products.push(data);
                productService.update(products,data).then(res =>{
                    resolve(res);
                }).catch(error=>{
                    reject(error)
                })
            } catch (error) {
                reject(error)
            }
        })
    }
    update(data){
        return new Promise(async(resolve, reject) => {
            try {                
                let products = await this.list();
                if(products.length){
                    let index = products.findIndex(prod => prod.productId == data.productId);
                    if(index <= -1){
                        reject("Product ID is not Exist")
                        return;
                    }else{
                        products[index] = data
                        productService.update(products,data).then(res =>{
                            resolve(res);
                        }).catch(error=>{
                            reject(error)
                        })
                    }
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    delete(id){
        return new Promise(async(resolve, reject) => {
            try {                
                let products = await this.list();
                if(products.length){
                    let updatedProducts = products.filter(prod => prod.productId != id);
                    if(updatedProducts.length == products.length){
                        reject("Product ID is not Exist")
                        return;
                    }else{
                        productService.update(updatedProducts,id).then(async(res) =>{
                            await cartService.removeProduct(id);
                            resolve(res);
                        }).catch(error=>{
                            reject(error)
                        })
                    }
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}