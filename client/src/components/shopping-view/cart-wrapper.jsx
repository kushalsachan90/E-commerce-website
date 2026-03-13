import { useDispatch, useSelector } from "react-redux"
import { Button } from "../ui/button"
import { Minus,Plus,Trash } from "lucide-react"
import { DeleteCartItem } from "@/store/cart-slice";
import { updateCartItem } from "@/store/cart-slice";
 function UserCartWrapper({cartItems}){
    console.log(cartItems,"cartItems")
    const dispatch=useDispatch();
      const {user}=useSelector((state)=>state.auth)
       function hanldleDeleteItem(getcartItem){
              dispatch(DeleteCartItem({userId:user.id,productId:getcartItem.productId}))
       }
        function handleupdatecart(getcartItem,typeofAction){
            dispatch(updateCartItem({userId:user.id,productId:getcartItem.productId,quantity: typeofAction==='add'?getcartItem.quantity+1:getcartItem.quantity-1}))
        }

    return (
        <div className="flex items-center space-x-4 mr-5 ml-5 ">
            <img src={cartItems.image} alt={cartItems.title} className="w-20 h-20 rounded object-cover" />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItems.title}</h3>
                <div className="flex items-center mt-1 gap-2">
                    <Button onClick={()=>handleupdatecart(cartItems,'minus')} variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Minus  className="w-4 h-4" />
                        <span  className="sr-only">Decrease</span>
                        
                    </Button>
                    <span className="font-semibold">{
                        cartItems.quantity
                        
                        }</span>
                        
                        
                    
                    <Button onClick={()=>handleupdatecart(cartItems,'add')} variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Plus  className="w-4 h-4" />
                        <span  className="sr-only">Decrease</span>
                        
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">

                <p className="font-semibold">
                    ${((cartItems.salePrice>0?cartItems.salePrice:cartItems.price)*cartItems.quantity).toFixed(2)}
                </p>
                <Trash onClick={()=>hanldleDeleteItem(cartItems)} className="cursor-pointer mt-1 size={20}"/>
            </div>
        </div>
    )
}
export default UserCartWrapper