const Product =require('../../models/product')

const getFilterProducts=async(req,res)=>{
    try{
      const {category=[],brand=[],sortBy="price-low-to-high"}=req.query;
      let filters={};
      let sort={};
      if(category.length){
        filters.category={$in:category.split(',')}
      }
       if(brand.length){
        filters.brand={$in:brand.split(',')}
      }

      switch(sortBy){
        case 'price-low-to-high':
          sort.price=1
          break;
          case 'price-high-to-low':
            sort.price=-1
            break;
            case 'title-a-to-z':
              sort.title=1
              break;
              case 'title-a-to-a':
                sort.title=-1
                break;
      }
      const products=await Product.find(filters).sort(sort);
      res.status(200).json({
        success:true,
        data:products
      })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'some error occurred'
        })
    }
}


const getProductDetails=async(req,res)=>{
  try{
          const {id}=req.params;
          const product=await Product.findById(id);
          if(!product) return res.status(401).json({
            sucess:false,
            message:"product Not Found"
          })
          res.status(200).json({
          success:true,
          message:'product found!',
          data:product
          })
  }
  catch(error){
      console.log(error);
        res.status(500).json({
            success:false,
            message:'some error occurred'
        })
  }

}

module.exports={getFilterProducts,getProductDetails}