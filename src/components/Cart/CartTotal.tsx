import { motion } from 'framer-motion'
import { useStateValue } from '../../context/StateProvider';

const CartTotal = ({ checkoutState }: { checkoutState: any }) => {
  const [{ cartTotal }] = useStateValue();
  return (
    <div className='w-full mt-auto bg-primary border-t border-white/10 px-8 py-6 flex flex-col gap-4'>
      <div className="w-full flex items-center justify-between">
        <p className="text-lightGray text-base">Sub Total</p>
        <p className="text-headingColor text-base font-bold"><span className="text-xs text-accent">₦</span> {cartTotal}</p>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-lightGray text-base">Delivery</p>
        <p className="text-headingColor text-base font-bold"><span className="text-xs text-accent">₦</span> {0.00}</p>
      </div>

      <div className="w-full border-b border-white/10 my-1"></div>

      <div className="w-full flex items-center justify-between">
        <p className="text-headingColor text-lg font-bold uppercase">Total</p>
        <p className="text-headingColor text-lg font-bold"><span className="text-sm text-accent">₦</span> {cartTotal}</p>
      </div>

      <motion.button
        onClick={() => checkoutState(true)}
        whileTap={{ scale: 0.95 }}
        className='w-full py-3 rounded-xl bg-gradient-to-tr from-orange-400 to-orange-600 text-white font-bold text-lg shadow-lg hover:shadow-orange-500/20 transition-all duration-200'
      >
        Checkout ₦{cartTotal}
      </motion.button>

    </div>
  )
}

export default CartTotal