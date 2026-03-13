 import { Card } from "../ui/card"
 import { CardContent } from "../ui/card"
 import { CardFooter } from "../ui/card"
 import { Button } from "../ui/button"
 
 
 function AdminProductTile({product,setFormData,setcurrentEditedid,setopencreateProductDialog,handleDelete}){
    console.log(product,"all the details about the product are present here")
    return (
        <Card>
       <div>
        <div className="relative">
   <img src={product?.image} alt={product?.title} className="w-full h-[300px] object-cover rounded-t-lg"/>
        </div>
        <CardContent>
            <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
            <div className="flex justify-between">
                <span className={`${product?.salePrice>0?'line-through':""}`}>${product?.price}</span>
                {/* <span className="text-lg font-bold">${product?.salePrice}</span> */}
                {
                    product?.salePrice>0?<span className="text-lg font-bold">${product?.salePrice}</span>:null
                      
               
                }
              
            </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <Button  onClick={()=>{setopencreateProductDialog(true)  ,setcurrentEditedid(product?._id), setFormData(product)} }>Edit</Button>
            <Button onClick={()=>handleDelete(product._id)}>Delete</Button>

        </CardFooter>
       </div>
       
        </Card>
    )
}
 export default AdminProductTile