import { useDispatch, useSelector } from "react-redux"
import { Button } from "../ui/button"
import { Minus,Plus,Trash } from "lucide-react"
import { DeleteCartItem } from "@/store/cart-slice";
import { updateCartItem } from "@/store/cart-slice";
import { toast } from "sonner";
 function UserCartWrapper({cartItems}){
   
    const dispatch=useDispatch();
      const {user}=useSelector((state)=>state.auth)
       function hanldleDeleteItem(getcartItem){
              dispatch(DeleteCartItem({userId:user.id,productId:getcartItem.productId}))
       }

        const { cartItems: allCartItems } = useSelector(state => state.cartProduct)   // ✅ add this
    const { productList } = useSelector(state => state.shopProducts)

        function handleupdatecart(getcartItem,typeofAction){

            if(typeofAction=='add'){
                  let getCartItems =allCartItems.items||[];
    
    
        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(
                item => item.productId === getcartItem.productId  // ✅ Bug 1 & 3 fixed
            );

            const getCurrentProductIndex = productList.findIndex(
                product => product._id === getcartItem.productId
            );

            const gettotalStock = productList[getCurrentProductIndex]?.totalStock  // ✅ Bug 2 fixed

            console.log(gettotalStock,getCurrentProductIndex,"gettotalstock")

            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > gettotalStock) {
                    toast.error(`Only ${gettotalStock} quantity can be added for this item`);
                    return;
                }
            }
        }
    }
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