const { readJSON, writeJSON } = require('../utils/fileHelper');

module.exports = class CartService {
    list(_userId){
        return new Promise(async(resolve, reject) => {  
            try {                
                let products = [];
                const carts = await readJSON('carts.json');
                const productList = await readJSON('products.json');
                if(carts.length){
                    carts.forEach(ele => {
                        if(ele.userId == _userId){
                            let product = productList.find(element=> element.productId == ele.productId);
                            delete(product.quantity)
                            products.push({...ele,...product})
                        }
                    })
                }
                resolve(products);
            } catch (error) {
                reject(error.message)
            }          
        })
    }
    listWithoutProjection(_userId){
        return new Promise(async(resolve, reject) => {  
            try {                
                let products = [];
                const carts = await readJSON('carts.json');
                if(carts.length){
                    carts.forEach(ele => {
                        if(ele.userId == _userId){
                            products.push(ele)
                        }
                    })
                }
                resolve(products);
            } catch (error) {
                reject(error.message)
            }          
        })
    }
    update(products){
        return new Promise(async(resolve, reject) => {  
            try {                
                await writeJSON('carts.json',products);
                resolve(products);
            } catch (error) {
                reject(error.message)
            }          
        })
    }
    removeProduct(_productId){
        return new Promise(async(resolve, reject) => {  
            try {                
                let products = [];
                const carts = await readJSON('carts.json');
                if(carts.length){
                    products = carts.filter(ele => ele.productId != _productId);
                    await writeJSON('carts.json',products);
                }
            resolve(products);
            } catch (error) {
                reject(error.message)
            }          
        })
    }
}