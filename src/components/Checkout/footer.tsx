import { BsShieldLock } from "react-icons/bs";

const CheckoutFooter = () => {
  return (
    <div className="w-full flex-1 mt-2 md:mt-0 rounded bg-cartItem rounded-t-[2rem] px-8 py-2 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <BsShieldLock className="text-xl text-orange-600" />
        <p className="text-white">
          Secured by <span className="font-bold text-orange-600">Flutterwave</span>
        </p>
      </div>
      <div className="flex gap-2 opacity-60">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-4 bg-white rounded-sm px-1" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 bg-white rounded-sm px-1" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 bg-white rounded-sm px-1" />
      </div>
    </div>
  );
};

export default CheckoutFooter;
