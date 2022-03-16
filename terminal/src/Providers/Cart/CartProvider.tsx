import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"

export const CartContext = createContext()

const CartProvider = (props:any) => {

    const [cart, setCart] = useState([])

    useEffect(() => {
        console.log(cart);
    }, [cart])

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {props.children}
        </CartContext.Provider>
    )

}

export default CartProvider