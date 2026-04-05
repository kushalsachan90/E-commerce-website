




///! test

import { DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import CommonForm from "../common/form"
import { useState } from "react"
import { Badge } from "../ui/badge"
import { useDispatch } from "react-redux"
import { getAllOrdersDetailsforAdmin, updateOrderStatus,getAllOrdersforAdmin } from "@/store/admin/orderSlice"
import { toast } from "sonner"
const initialFormData={
    status:'',

}
function AdminOrderDetailsView({orderDetails}){
    const [formData,setFormData]=useState(initialFormData)
const dispatch=useDispatch()
    function handleupdateStatus(event){
event.preventDefault();
console.log(formData)
const {status}=formData
dispatch(updateOrderStatus({id:orderDetails._id,orderStatus:status}))
        .then((data)=>{
            console.log(data,'123')
            if(data.payload.success){
                dispatch(getAllOrdersDetailsforAdmin(orderDetails._id));
                 dispatch(getAllOrdersforAdmin());
                setFormData(initialFormData)
                toast("order updated Successfully")
            }
        })
    }
    return (
        <DialogContent className="sm:max-w-[600px] ">
              <div className="grid gap-6 mt-6" >
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <p className="font-medium ">Order Id</p>
                           <Label>{orderDetails?._id}</Label>
                           
                    </div>
                     <div className="flex items-center justify-between">
                        <p className="font-medium ">Order Date</p>
                           <Label>{orderDetails?.orderDate?.split('T')[0]}</Label>
                           
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-medium ">Order Status</p>
                           <Label><Badge className={`py-1 px-3 ${orderDetails?.orderStatus === 'confirmed' ? 'bg-green-500': orderDetails?.orderStatus === 'rejected'?"bg-red-500": 'bg-black'}`}>
                {orderDetails?.orderStatus}
              </Badge></Label>
                           
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-medium ">Order Price</p>
                           <Label>${orderDetails?.totalAmount}</Label>
                           
                    </div>
                    <div className="flex items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>

          </div>
            <div className="flex items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>

          </div>
                </div>
                <Separator/>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails.cartItems.length > 0
                ? orderDetails.cartItems.map((item) => (
                    <li key={item.productId} className=" grid grid-cols-3 items-center text-md gap-5 ">
                      <span>Product: {item.title}</span>
                         <span>Quantity:{item.quantity}</span>

                      <span>${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
                    </div>
                </div>
                 <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                         <div className="grid gap-0.5 text-muted-foreground">
                                <span>kushal</span>
                                <span>Address</span>
                                <span>city</span>
                                <span>pincode</span>
                                <span>notes</span>
                         </div>
                         </div>
                 </div>
                 <div>
                    <CommonForm 
                     formControls={[
                        {
                             label:'Order Status',
        name:"status",
        componentType:'select',
        options:[
              {id:"pending",label:"Pending"},
             {id:"inProcess",label:"In Process"},
             {id:"inShipping",label:"In Shipping"},
             {id:"rejected",label:"Rejected"},
             {id:"deliverd",label:"Delivered"}
        ]
                        }
                     ]}
                      formData={formData}
                     setFormData={setFormData}
                     buttonText={'update Order status'}
                     onSubmit={handleupdateStatus}
                    />
                 </div>
              </div>
        </DialogContent>
    )
}

export default AdminOrderDetailsView