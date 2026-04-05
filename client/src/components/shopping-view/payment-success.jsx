import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

function PaymentSuccess() {
    const navigate=useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="font-bold text-5xl">
        Payment Successful...
      </h1>

      <Button onClick={()=>navigate('/shop/account')}>
        View Orders
      </Button>
    </div>
  )
}

export default PaymentSuccess