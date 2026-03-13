
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerFormControls } from "@/components/config";
import Form from "@/components/common/form";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { toast } from "sonner";
const initialState={
    userName:'',
    email:'',
    password:''
}

function AuthRegister(){
 const [formData,setFormData]=useState(initialState);
    console.log(formData);
    const dispatch =useDispatch();
    const navigate=useNavigate()
function onSubmit(event){
event.preventDefault();

dispatch(registerUser(formData)).then((data)=>{
    if(data?.payload?.success){
        toast(data?.payload?.message)
        navigate("/auth/login")
    } 
    else{
        toast(data?.payload?.message)
    }
}
 
)

}

    
    return (
       <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">create new account</h1>
                <p >Already have Account 
                    <Link className="font-medium text-primary hover:underline ml-2" to="/auth/login">Login</Link>
                </p>
                <Form formControls={registerFormControls} formData={formData} setFormData={setFormData} onSubmit={onSubmit} buttonText={'Sign Up'}/>
            </div>
        </div>
    )
}

export default AuthRegister;