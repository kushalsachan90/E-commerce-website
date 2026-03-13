import { Link } from "react-router-dom";
 import { use, useState } from "react";
import { LoginFormControls } from "@/components/config";
import Form from "@/components/common/form";
import { useDispatch } from "react-redux";
import { LoginUser } from "@/store/auth-slice";
import {toast} from "sonner"
const initialState={
    email:'',
    password:''
}


function AuthLogin(){

    const [formData,setFormData]=useState(initialState);
        const dispatch=useDispatch();
        
    function onSubmit(event){
     event.preventDefault();
     dispatch(LoginUser(formData)).then((data)=>{
        if(data?.payload?.success){
            toast(data?.payload?.message)
        }
        else{
            toast(data?.payload?.message)
        }
     })
    }
    return (
      <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to you Account</h1>
                <p >Don't have Account
                    <Link className="font-medium text-primary hover:underline ml-2" to="/auth/register">Register</Link>
                </p>
                <Form formControls={LoginFormControls} formData={formData} setFormData={setFormData} onSubmit={onSubmit} buttonText={'Login'}/>
            </div>
        </div>
    )
}
export default AuthLogin;