import { useContext, useState, useEffect } from "react"
import CommandSingle from "../../Components/Client/CommandSingle"
import { CartContext } from "../../Providers/Cart/CartProvider"
import { createCommand } from "../../Services/CommandApi"

interface Props {
    children : JSX.Element
}

const Cart = (props:Props) => {

    const {cart, setCart} = useContext(CartContext)

    const [popUp, setPopUp] = useState(false)
    
    const removeProduct = (product:any) => {
        const remove = cart.filter((productRemove:any) => {
            if (productRemove.product.id !== product.product.id){
                return(productRemove)
            }
        })
        setCart(remove)
    }

    const addOne = (product:any) => {

        const add = cart.map((productAdd:any) => {
            
            if (product.product.id === productAdd.product.id) {
                productAdd.quantity += 1
            }

            return productAdd
        })
        setCart(add)

    }
    const removeOne = (product:any) => {
        const remove = cart.map((productRemove:any) => {
            if (product.product.id === productRemove.product.id) {
                productRemove.quantity -= 1
            }
            return productRemove
        })

        setCart(remove)
    }

    const order = async () => {
        const command = await createCommand(cart)
        console.log(command);
    }

    return (
        <>
            <div>
                {
                    cart.map((product:any) => {
                        
                        return(
                            <div>
                                <div key={product.product.id}>
                                    <p>{product.product.custom}</p>
                                    <p>quantity : {product.quantity}</p>
                                    <p>{product.product.name}</p>
                                    <p>{product.product.price}</p>
                                    {
                                        product.product.productHasIngredient.map((ingredient:any) => {
                                            return(
                                                <div key={ingredient.ingredient.id}>
                                                    <p>{ingredient.ingredient.price}</p>
                                                    <p>{ingredient.ingredient.name}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button onClick={() => {removeProduct(product)}}>remove this product</button>
                                <button onClick={() => { addOne(product) }}>add one</button>
                                <button onClick={() => { removeOne(product) }}>remove one</button>
                                <button onClick={() => { setPopUp(true) }}>change ingredient</button>
                                {
                                    popUp && <CommandSingle product={product.product} deactivate={()=>{setPopUp(false)}} action={"changeIngredient"} />
                                }
                            </div>
                        )
                    })
                }
                <div>
                    <button onClick={() => {
                        order()
                    }}>
                        commander
                    </button>
                </div>
            </div>
            {props.children}
        </>
    )
}

export default Cart