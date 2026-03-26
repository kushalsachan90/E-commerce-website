import { Card,CardContent,CardTitle,CardHeader } from "../ui/card";
import CommonForm from "../common/form"
import { addressFormControls } from "../config";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from "@/store/shop/addressSlice";
import { useEffect } from "react";
import AddressCart from '../shopping-view/address-cart'
import { toast } from "sonner";

const initialAddressFormData={
    address:'',
    city:'',
    phone:'',
    pincode:'',
    notes:''
}

function Address(){

    const [formData,setFormData]=useState(initialAddressFormData)
    const [currentEditId,setcurrentEditId]=useState(null)
    const {user}=useSelector(state=>state.auth)
    const {addressList}=useSelector(state=>state.Address)
    const dispatch=useDispatch()
    console.log(user,"user from store")

    function handleManageAddress(event){
        event.preventDefault()
        if(addressList.length>=3&&currentEditId===null){
            toast.error("Add max 3 address")
            return ;
        }
        
        
        currentEditId!==null?dispatch(editAddress({
            userId:user.id,AddressId:currentEditId,formData
            
        })).then((data)=>{
            if(data.payload.success==true){
               dispatch(fetchAllAddress(user.id)),
               setcurrentEditId(null)
               setFormData(initialAddressFormData)
               toast("Address Edited Successfully")
            }
        }):
        dispatch(addAddress({
            ...formData,
          userId:user.id
        })).then((data)=>{
            console.log(data,'addAddress')
        if(data.payload.success==true){
            dispatch(fetchAllAddress(user.id));
            setFormData(initialAddressFormData);
 toast("Address Added Successfully")
        }
        })
    }
  

 function handledeleteAddress(getCurrentAddress){
    
        console.log(getCurrentAddress,"Address")

        dispatch(deleteAddress({userId:user.id,AddressId:getCurrentAddress._id}))
        .then((data)=>{
            console.log(data,"dataDeleted")
            if(data.payload.success==true){
                dispatch(fetchAllAddress(user.id))
                toast("Address Deleted Successfully")
            }
            
        })
    }

    function handleEditAddress(getCurrentAddress){
        setcurrentEditId(getCurrentAddress._id);
        setFormData({
            ...formData,
            address:getCurrentAddress.address,
                city:getCurrentAddress.city,
                phone:getCurrentAddress.phone,
                pincode:getCurrentAddress.pincode,
                notes:getCurrentAddress.notes

        })
       
    }


  useEffect(() => {
    if (user?.id) {
        dispatch(fetchAllAddress(user.id));
    }
}, [dispatch, user?.id]);

    console.log(addressList,"addressList")
    function isFormValid(){
        return Object.keys(formData).map(key=>formData[key].trim() !=='').every(item=>item);

    }

   
return <Card>
        <div className="mb-5 =-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
       {
        addressList && addressList.length>0? addressList.map(singleitem=><AddressCart handleEditAddress={handleEditAddress} addressInfo={singleitem} handledeleteAddress={handledeleteAddress}/>):null
       }
        </div>
        <CardHeader>
            <CardTitle>{
            currentEditId!=null?'Edit Address':'Add New Address'
            }
            </CardTitle>
        </CardHeader>
        <CardContent  className="space-y-3">
            <CommonForm formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={ currentEditId!=null?'Edit':'Add'}
            onSubmit={handleManageAddress}
            isBtndisabled={!isFormValid()}
            />
        </CardContent>
    </Card>
    

}
export default Address;