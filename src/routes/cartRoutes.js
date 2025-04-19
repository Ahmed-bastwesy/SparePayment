let express = require('express');
let router = express.Router();
let checkAuth = require('../middlewares/checkAuth')
let validateCart = require('../middlewares/cartValidation')
let cartController = new (require('../controllers/cartController'))()
const AppError = require('../utils/appError');

router.get('/',checkAuth,(req,res,next)=>{
    cartController.getUserCart().then(products => {
               return res.status(200).json({ message:"Products List" , products })
        }).catch(error => {
                next(new AppError(error, 400));
        });
})


module.exports = router;