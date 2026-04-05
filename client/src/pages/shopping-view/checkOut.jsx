// // import Address from '@/components/shopping-view/address'
// // import img from '../../assets/account.jpg'
// // import { useSelector } from 'react-redux'
// // import UserCartItemsWrapper from '@/components/shopping-view/cart-items-content'
// // function CheckOut(){
// //     const {cartItems}= useSelector(state=>state.cartProduct)

// //     console.log(cartItems,"cartitems")

// //     return <div className="flex flex-col">
// //     <div className="relative h-[300px] w-overflow-hidden">
// //         <img src={img} alt="account-img" className="h-full w-full object-cover object-center" />
// //     </div>
// //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
// //          <Address/>
// //          <div className="flex flex-col gap-4">
// //   {cartItems?.items?.length > 0 ? (
// //   cartItems.items.map(item => (
// //     <UserCartItemsWrapper key={item.productId} cartItems={item} />
// //   ))
// // ) : (
// //   <div>No items in cart</div>
// // )}
// //          </div>
// //     </div>
// //     </div>
// // }
// // export default CheckOut

// //!test

import Address from '@/components/shopping-view/address'
import img from '../../assets/account.jpg'
import { useDispatch, useSelector } from 'react-redux'
import UserCartWrapper from '@/components/shopping-view/cart-wrapper'  // ✅ changed import
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { createNewOrder } from '@/store/order-slice'
import { current } from '@reduxjs/toolkit'
import { toast } from 'sonner'
function CheckOut(){
  const dispatch=useDispatch()

    const {cartItems}= useSelector(state=>state.cartProduct)
    console.log(cartItems,"cartitems")

         const {user}=useSelector(state=>state.auth)
          const {approvalUrl}=useSelector(state=>state.Orderdetails)
         
          const [currentSelectedAddress,setCurrentSelectedAddress]=useState(null)
          const [isPaymentStart,SetIsPayment]=useState(false)
          console.log(currentSelectedAddress,'currentSelectedAddress')

const totalCartAmount = cartItems?.items?.length > 0
        ? cartItems.items.reduce((sum, currentItem) =>
            sum + (currentItem.salePrice > 0 ? currentItem.salePrice : currentItem.price) * currentItem.quantity, 0)
        : 0;
         function handleInitiatePaypalpayment(){
            
            if(cartItems.length==0){
                toast("your cart is empty please add items");
                return ;
            }

            if(currentSelectedAddress==null){
              toast.error('Address not selected')
              return ;
            }
            const orderData={
                userId:user.id,
                cartId:cartItems._id,
                cartItems: cartItems.items.map(singleCartItems=>({
                    productId: singleCartItems.productId,
title:singleCartItems.title,
image:singleCartItems.image,
price:singleCartItems.salePrice>0? singleCartItems.salePrice:singleCartItems.price,
quantity:singleCartItems.quantity
                        })),
                    
                       
                    
                
                addressInfo:{
                    addressId:currentSelectedAddress._id,
 address:currentSelectedAddress.address,
 city:currentSelectedAddress.city,
 pincode:currentSelectedAddress.pincode,
 phone:currentSelectedAddress.phone,
 notes:currentSelectedAddress.notes
                },
                orderStatus:'pending',
                paymentMethod:'paypal',
                paymentStatus:'pending',
                totalAmount:totalCartAmount,
                orderDate:new Date(),
                orderUpdateDate:new Date(),
                paymentId:'',
                payerId:''
            }
              console.log(orderData,"orderData")
              dispatch(createNewOrder(orderData)).then((data)=>{
                console.log(data,'kushal')
                if(data.payload.success){
                   SetIsPayment(true)
                }else{
                    SetIsPayment(false)
                }
              })
         }
if(approvalUrl){
    window.location.href=approvalUrl
}
        

   

    return (
        <div className="flex flex-col">
            <div className="relative h-[300px] w-overflow-hidden">
                <img src={img} alt="account-img" className="h-full w-full object-cover object-center" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
                <Address setCurrentSelectedAddress={setCurrentSelectedAddress} currentSelectedAddress={currentSelectedAddress}/>
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
                <Button  onClick={handleInitiatePaypalpayment}className="w-full">CheckOut with Paypal</Button>
            </div>
                </div>
                
            </div>
           
        </div>
    )
}

export default CheckOut



