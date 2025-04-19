let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController')

router.get('/login',async(req , res)=>{
        let usersList = await userModel.find()
        res.status(200).json(usersList)
})

module.exports = router;