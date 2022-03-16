import { useContext, useState, useEffect } from "react"
import { Ingredient } from "../../Interfaces/Ingredient"
import { Product } from "../../Interfaces/Product"
import { CartContext } from "../../Providers/Cart/CartProvider"

interface Props {
    children : JSX.Element
}

const Cart = (props:Props) => {

    const {cart, setCart} = useContext(CartContext)
    
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

    return (
        <>
            <div>
                {
                    cart.map((product:any) => {
                        console.log(product);
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
                                <button onClick={() => {
                                    removeProduct(product)
                                }}>remove this product</button>
                                <button
                                onClick={() => {
                                    addOne(product)
                                }}>add one</button>
                                <button
                                onClick={() => {
                                    removeOne(product)
                                }}>remove one</button>
                            </div>
                        )
                    })
                }
                <div>
                    <button>
                        commander
                    </button>
                </div>
            </div>
            {props.children}
        </>
    )
}

export default Cart