let express = require('express');
let userRoutes = require('./routes/userRoutes');
let productRoutes = require('./routes/productRoutes');
let cartRoutes = require('./routes/cartRoutes');
let errorHandler = require('./middlewares/errorHandler');
let app = express();
let port = 8500;

// built in middleware to parse body of request
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('/api/user',userRoutes)
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)
app.use((req, res, next) => {
    res.status(404).json({
      error: 'Endpoint not found',
      method: req.method,
      url: req.originalUrl
    });
  });
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`servr is ready to run on port ${port}`)
})