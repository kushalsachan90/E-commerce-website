import { DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import CommonForm from "../common/form"
import { useState } from "react"
const initialFormData={
    status:'',

}
function AdminOrderDetailsView(){
    const [formData,setFormData]=useState(initialFormData)

    function handleupdateStatus(event){
event.preventDefault();
    }
    return (
        <DialogContent className="sm:max-w-[600px] ">
              <div className="grid gap-6 mt-6" >
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <p className="font-medium ">Order Id</p>
                           <Label>123456</Label>
                           
                    </div>
                     <div className="flex items-center justify-between">
                        <p className="font-medium ">Order Date</p>
                           <Label>12/1/2/12</Label>
                           
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-medium ">Order Status</p>
                           <Label>inprocess</Label>
                           
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-medium ">Order Price</p>
                           <Label>$500</Label>
                           
                    </div>
                </div>
                <Separator/>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span>Product One</span>
                                <span>$100</span>
                            </li>
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
        name:"Order Status",
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