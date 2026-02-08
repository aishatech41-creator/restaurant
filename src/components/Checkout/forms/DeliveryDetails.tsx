import { useStateValue } from "../../../context/StateProvider";
import { useEffect, useState } from "react";

const DeliveryDetails = () => {
    const [{ checkoutData, user }, dispatch] = useStateValue();

    // Address Validation State
    const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
    const [validationMsg, setValidationMsg] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({
            type: "UPDATE_CHECKOUT_DATA",
            checkoutData: {
                ...checkoutData,
                [name]: value,
            },
        });
    };

    // Auto-fill from user profile
    useEffect(() => {
        if (user) {
            dispatch({
                type: "UPDATE_CHECKOUT_DATA",
                checkoutData: {
                    ...checkoutData,
                    fullname: user.name || user.displayName || "",
                    email: user.email || "",
                    phone: user.phone || user.phoneNumber || "",
                },
            });
        }
    }, [user, dispatch]);

    // Live Address Validation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (checkoutData.address && checkoutData.address.length > 5) {
                validateAddress(checkoutData.address);
            } else {
                setValidationStatus('idle');
                setValidationMsg("");
            }
        }, 1500); // Debounce for 1.5s

        return () => clearTimeout(timer);
    }, [checkoutData.address]);

    const validateAddress = async (address: string) => {
        setValidationStatus('validating');
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
            const data = await response.json();

            if (data && data.length > 0) {
                setValidationStatus('valid');
                setValidationMsg("Address found!");
            } else {
                setValidationStatus('invalid');
                setValidationMsg("Address not found. Please try adding more details (City, Region).");
            }
        } catch (error) {
            console.error("Validation error", error);
            setValidationStatus('idle');
        }
    };

    return (
        <div className="w-full p-1 px-2 rounded-lg flex flex-col mb-4 gap-4">
            <div className="w-full flex flex-col">
                <label htmlFor="fullname" className="font-bold text-base mb-1 text-gray-100">
                    Full Name
                </label>
                <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={checkoutData.fullname || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg bg-cartItem text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter your full name"
                    autoComplete="off"
                />
            </div>

            <div className="w-full flex flex-col">
                <label htmlFor="email" className="font-bold text-base mb-1 text-gray-100">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={checkoutData.email || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg bg-cartItem text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter your email"
                    autoComplete="off"
                />
            </div>

            <div className="w-full flex flex-col relative">
                <label htmlFor="address" className="font-bold text-base mb-1 text-gray-100 flex justify-between">
                    Delivery Address
                    {validationStatus === 'validating' && <span className="text-xs text-yellow-500 font-normal animate-pulse">Checking...</span>}
                    {validationStatus === 'valid' && <span className="text-xs text-green-500 font-normal">✓ Valid Address</span>}
                    {validationStatus === 'invalid' && <span className="text-xs text-red-500 font-normal">✗ Invalid Address</span>}
                </label>
                <div className="relative">
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={checkoutData.address || ""}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg bg-cartItem text-white placeholder-gray-500 focus:outline-none transition-colors pr-10
                            ${validationStatus === 'valid' ? 'border-green-500' :
                                validationStatus === 'invalid' ? 'border-red-500' :
                                    'border-gray-600 focus:border-orange-500'}`}
                        placeholder="Enter delivery address (e.g. 123 Main St, Accra)"
                        autoComplete="off"
                    />
                </div>
                {validationStatus === 'invalid' && <p className="text-[10px] text-red-400 mt-1">{validationMsg}</p>}
            </div>

            <div className="w-full flex flex-col">
                <label htmlFor="phone" className="font-bold text-base mb-1 text-gray-100">
                    Phone Number
                </label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={checkoutData.phone || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg bg-cartItem text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter phone number"
                    autoComplete="off"
                />
            </div>
        </div>
    );
};

export default DeliveryDetails;
