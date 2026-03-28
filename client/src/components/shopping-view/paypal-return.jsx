import { Card,CardTitle,CardHeader } from "../ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { captureOrder } from "@/store/order-slice";
function paypalReturn(){

    const dispatch=useDispatch();
    const location =useLocation()

    const params=new URLSearchParams(location.search);
    const paymentId= params.get('paymentId')

    const payerId=params.get('PayerID')

    useEffect(()=>{
       if(paymentId&&payerId){
        const getcurrentOrderId=JSON.parse(sessionStorage.getItem('currentOrderId'))
        dispatch(captureOrder({paymentId,payerId,orderId:getcurrentOrderId})).then((data)=>{
            console.log(data,'capturPayment')
            if(data.payload.success){
                sessionStorage.removeItem('currentOrderId')
                window.location.href='/shop/payment-success'
            }
        })
       }
    },[payerId,payerId,dispatch])

return <Card>
    <CardHeader>
        <CardTitle className="flex items-center gap-2"> <Spinner />Processing payment... please wait!!</CardTitle>
    </CardHeader>
</Card>
}

export default paypalReturn