let promoService = new(require("../services/promoService"))();

module.exports = class PromoController {
    list(){
        return new Promise((resolve, reject) => {
            promoService.list().then(promos =>{
                resolve(promos);
            }).catch(error=>{
                reject(error)
            })
        })
    }
    create(data){
        return new Promise(async(resolve, reject) => {
            try {                
                let promos = await this.list();
                if(promos.length){
                    let promo = promos.find(prod => prod.promoId == data.promoId);
                    if(promo){
                        reject("Promo ID is already Exist")
                        return;
                    }
                }
                promos.push(data);
                promoService.update(promos,data).then(res =>{
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
                let promos = await this.list();
                if(promos.length){
                    let index = promos.findIndex(prod => prod.promoId == data.promoId);
                    if(index <= -1){
                        reject("Promo ID is not Exist")
                        return;
                    }else{
                        promos[index] = data
                        promoService.update(promos,data).then(res =>{
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
                let promos = await this.list();
                if(promos.length){
                    let updatedPromos = promos.filter(prod => prod.promoId != id);
                    if(updatedPromos.length == promos.length){
                        reject("Promo ID is not Exist")
                        return;
                    }else{
                        promoService.update(updatedPromos,id).then(async(res) =>{
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