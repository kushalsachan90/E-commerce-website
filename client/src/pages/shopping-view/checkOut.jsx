// import Address from '@/components/shopping-view/address'
// import img from '../../assets/account.jpg'
// import { useSelector } from 'react-redux'
// import UserCartItemsWrapper from '@/components/shopping-view/cart-items-content'
// function CheckOut(){
//     const {cartItems}= useSelector(state=>state.cartProduct)

//     console.log(cartItems,"cartitems")

//     return <div className="flex flex-col">
//     <div className="relative h-[300px] w-overflow-hidden">
//         <img src={img} alt="account-img" className="h-full w-full object-cover object-center" />
//     </div>
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
//          <Address/>
//          <div className="flex flex-col gap-4">
//   {cartItems?.items?.length > 0 ? (
//   cartItems.items.map(item => (
//     <UserCartItemsWrapper key={item.productId} cartItems={item} />
//   ))
// ) : (
//   <div>No items in cart</div>
// )}
//          </div>
//     </div>
//     </div>
// }
// export default CheckOut

//!test

import Address from '@/components/shopping-view/address'
import img from '../../assets/account.jpg'
import { useSelector } from 'react-redux'
import UserCartWrapper from '@/components/shopping-view/cart-wrapper'  // ✅ changed import
import { Button } from '@/components/ui/button'
function CheckOut(){
    const {cartItems}= useSelector(state=>state.cartProduct)
    console.log(cartItems,"cartitems")

    const totalCartAmount = cartItems?.items?.length > 0
        ? cartItems.items.reduce((sum, currentItem) =>
            sum + (currentItem.salePrice > 0 ? currentItem.salePrice : currentItem.price) * currentItem.quantity, 0)
        : 0;

    return (
        <div className="flex flex-col">
            <div className="relative h-[300px] w-overflow-hidden">
                <img src={img} alt="account-img" className="h-full w-full object-cover object-center" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
                <Address/>
                <div className="flex flex-col gap-4">
                    {cartItems?.items?.length > 0 ? (
                        <>
                            {cartItems.items.map(item => (
                                <UserCartWrapper key={item.productId} cartItems={item} />  // ✅ changed component
                            ))}
                            <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
                                <span>Total</span>
                                <span>${totalCartAmount.toFixed(2)}</span>
                            </div>
                        </>
                    ) : (
                        <div>No items in cart</div>
                    )}
                     <div>
                <Button className="w-full">CheckOut with Paypal</Button>
            </div>
                </div>
                
            </div>
           
        </div>
    )
}

export default CheckOut