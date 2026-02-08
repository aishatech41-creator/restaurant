import { BiLock } from "react-icons/bi";
import CheckoutFooter from "./footer";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { emptyCart } from "../../utils/functions";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import DeliveryDetails from "./forms/DeliveryDetails";
import { orderService } from "../../services/orderService";

const Body = ({ action }: { action: any }) => {
  const [{ checkoutData, cartTotal, cartItems, foodItems }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const config = {
    // public_key: "FLWPUBK_TEST-5f2e5f5f7e6f4f5f5f5f-X", // Replace with your actual public key
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY as string,
    tx_ref: Date.now().toString(),
    amount: parseFloat(cartTotal),
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: checkoutData?.email || "user@example.com",
      phone_number: checkoutData?.phone || "",
      name: checkoutData?.fullname || "",
    },
    customizations: {
      title: "Bentilzone Restaurant",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const completePayment = () => {


    if (!checkoutData?.fullname || !checkoutData?.address || !checkoutData?.phone || !checkoutData?.email) {

      return toast.error("Please complete delivery details");
    }



    handleFlutterPayment({
      callback: (response) => {

        if (response.status === "successful" || response.status === "completed") {
          setLoading(true);
          setTimeout(async () => {
            // Save Order to Database
            await orderService.save({
              items: cartItems,
              total_amount: cartTotal,
              delivery_details: checkoutData,
              payment_status: 'paid',
              transaction_ref: String(response.transaction_id || Date.now())
            }).catch(err => {
              console.error("Order save failed", err);
              const errors = err.response?.data?.errors;
              const errorMsg = errors ? Object.values(errors).flat().join(", ") : err.message;
              toast.error("Validation Error: " + errorMsg);
            });

            setLoading(false);
            await emptyCart(cartItems, foodItems, dispatch);
            action(false);
            toast.success("Order completed successfully. Thank you for your patronage.", {
              position: "top-center",
              autoClose: 6000
            });
          }, 1000);
          closePaymentModal();
        } else {
          console.error("Flutterwave Payment Failed:", response);
          toast.error(`Payment failed: ${response.status}`);
          closePaymentModal();
        }
      },
      onClose: () => {

        setLoading(false);
      },
    });
  };

  return (
    <div className="w-full h-full rounded-t-[2rem]  bg-cartBg flex flex-col overflow-y-scroll scrollbar-none">
      <div className="w-full p-2">
        <DeliveryDetails />
      </div>

      <div className="w-full flex items-center justify-center my-2">
        <p className="text-gray-300">
          Amount Due:{" "}
          <span className="font-bold text-white">{`₦${cartTotal}`}</span>{" "}
        </p>
      </div>

      <div className="w-full flex items-center justify-center mt-4">
        <motion.button
          onClick={completePayment}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 w-[90%] p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 transition-all duration-75 ease-in-out text-gray-50 text-lg my-2 hover:shadow-lg"
        >
          {!loading && <BiLock className="" />}
          {!loading ? (
            "PAY NOW"
          ) : (
            <ImSpinner3 className="animate animate-spin" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Body;
