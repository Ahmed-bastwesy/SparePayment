let express = require('express');
let router = express.Router();
let validatePromo = require('../middlewares/promoValidation')
let promoController = new (require('../controllers/promoController'))()
const AppError = require('../utils/appError');

router.get('/',(req,res,next)=>{
    promoController.list().then(promos => {
               return res.status(200).json({ message:"Promo List" , promos })
        }).catch(error => {
                next(new AppError(error, 400));
        });
})
router.post('/',validatePromo,(req,res,next)=>{
    promoController.create(req.body).then(promo => {
               return res.status(200).json({ message:"Promo created successfull" , promo })
        }).catch(error => {
                next(new AppError(error, 400));
        });
})
router.put('/',validatePromo,(req,res,next)=>{
    promoController.update(req.body).then(promo => {
               return res.status(200).json({ message:"Promo updated successfull" , promo })
        }).catch(error => {
                next(new AppError(error, 400));
        });
})
router.delete('/:id',(req,res,next)=>{
    promoController.delete(req.params.id).then(id => {
               return res.status(200).json({ message:`Promo id ${id} deleted successfull`})
        }).catch(error => {
                next(new AppError(error, 400));
        });
})

module.exports = router;