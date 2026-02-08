import CartItem from './Item'
import CartTotal from './CartTotal'
import { useStateValue } from '../../context/StateProvider';

const CartBody = ({ action }: { action: any }) => {
  const [{ cartItems }] = useStateValue();
  return (
    <div className='w-full h-full flex flex-col justify-between overflow-hidden'>
      <div className='w-full flex-1 px-4 py-4 flex flex-col gap-4 overflow-y-scroll scrollbar-hidden'>
        {
          cartItems && cartItems.length > 0 && cartItems.map((item: any, index: number) => {
            return <CartItem key={index} item={item} />
          })
        }
      </div>
      <CartTotal checkoutState={action} />
    </div>
  )
}

export default CartBody