import { getCart } from "@/lib/db/cart"
import CartEntry from "./CartEntry"
import { setProductQuantity } from "./actions"


export const metadata ={ 
    title: "Tour Cart - Flowmazon"
}


export default async function CartPage() {
   const cart = await getCart()

    return(
        <div>
            <h1 className="text-3xl mb-6 font-bold">Shopping Cart</h1>
            {cart?.items.map((cartItem)=> (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}  />
            ))}
        </div>
    )
}