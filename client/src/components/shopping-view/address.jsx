import { Card,CardContent,CardTitle,CardHeader } from "../ui/card";
import CommonForm from "../common/form"
import { addressFormControls } from "../config";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, fetchAllAddress } from "@/store/shop/addressSlice";
import { useEffect } from "react";
import AddressCart from '../shopping-view/address-cart'
const initialAddressFormData={
    address:'',
    city:'',
    phone:'',
    pincode:'',
    notes:''
}

function Address(){

    const [formData,setFormData]=useState(initialAddressFormData)
    const {user}=useSelector(state=>state.auth)
    const {addressList}=useSelector(state=>state.Address)
    const dispatch=useDispatch()
    console.log(user,"user from store")

    function handleManageAddress(event){
        event.preventDefault()
        dispatch(addAddress({
            ...formData,
          userId:user.id
        })).then((data)=>{
            console.log(data,'addAddress')
        if(data.payload.success==true){
            dispatch(fetchAllAddress(user.id));
            setFormData(initialAddressFormData);
        }
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
        <div className="mb-5 =-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
       {
        addressList && addressList.length>0? addressList.map(singleitem=><AddressCart addressInfo={singleitem}/>):null
       }
        </div>
        <CardHeader>
            <CardTitle>Add New Address</CardTitle>
        </CardHeader>
        <CardContent  className="space-y-3">
            <CommonForm formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={'Add'}
            onSubmit={handleManageAddress}
            isBtndisabled={!isFormValid()}
            />
        </CardContent>
    </Card>
    

}
export default Address;