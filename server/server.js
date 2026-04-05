    const express=require('express');
    const mongoose=require('mongoose');
    const cookieParser=require('cookie-parser');
    const cors=require('cors');
    const dns=require('dns');
    dns.setServers(["1.1.1.1","8.8.8.8"])
    const authRoutes=require('./routes/auth/auth-routes');
    const adminProductsRoutes=require('./routes/admin-routes/product-routes')
      const shopProductRoutes=require('./routes/shop/product-routes')
      const shopCartRoutes=require('./routes/shop/cart-routes')
      const shopAddress=require('./routes/shop/address-routes')
      const shopOrderRouter=require('./routes/shop/order-routes')
      const adminOrderRoutes=require('./routes/admin-routes/order-routes')

      const SearchRouter=require('./routes/shop/search-routes')
    const CommonFeatureRouter=require('./routes/common/feature-routes')
      const shopReviewRoutes=require('./routes/shop/review-routes')
      //connection with database
   mongoose.connect("mongodb+srv://kushalsachan90:kushalsachan90@cluster0.otitepz.mongodb.net/?appName=Cluster0")
   .then(()=>console.log("connected to database"))
      .catch((err)=>console.log(err));
const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ]
}))

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/admin/products',adminProductsRoutes)
 app.use('/api/shop/products',shopProductRoutes)
app.use('/api/shop/cart',shopCartRoutes)
app.use('/api/shop/address',shopAddress)
app.use('/api/shop/order',shopOrderRouter)
app.use('/api/admin/order',adminOrderRoutes)
app.use('/api/shop/search',SearchRouter);
app.use('/api/shop/review',shopReviewRoutes)
app.use('/api/common/feature',CommonFeatureRouter)

const PORT =process.env.PORT||5000;


app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));