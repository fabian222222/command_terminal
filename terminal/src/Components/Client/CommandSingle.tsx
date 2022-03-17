import { Product } from '../../Interfaces/Product'
import { useForm } from "react-hook-form";
import { CartContext } from "../../Providers/Cart/CartProvider"
import {useState} from "react"
import { useEffect, useContext } from 'react';

const CommandSingle = (props:{
    product: Product,
    deactivate:Function;
    action : string
}) => {
    const {register, handleSubmit} = useForm()

    const {cart, setCart} = useContext(CartContext)
    const [ingredientsChoosen, setIngredientsChoosen] = useState([])
    const [productCustom, setProductCustom] = useState()

    const cartChecker = (productToAdd:any) => {
        const productFinder = cart.find((product:any) => {
            return product.product.id === productToAdd.id
        })

        if (props.action === "add") {

            if (productFinder) {
                const update = cart.map((updateItem:any) => {
                    if (updateItem.product.id === productToAdd.id) {
                        updateItem.quantity += 1
                    }
                    return updateItem
                })
                return setCart([...update])
            } else {
                setCart([...cart, {product:{...productToAdd, id : null, name:productToAdd.name + " custom"}, quantity: 1}])
            }

        } else if (props.action === "changeIngredient") {

            if (productFinder) {
                const update = cart.map((updateItem:any) => {
                    if (updateItem.product.id === productToAdd.id) {
                        updateItem.productHasIngredient = productToAdd.productHasIngredient
                    }
                    return updateItem
                })
                return setCart([...update])
            } 

        }
    }

    useEffect(() => {
        if (ingredientsChoosen.length > 0){
            setProductCustom({...props.product, productHasIngredient:ingredientsChoosen})
        }
    }, [ingredientsChoosen])
    
    useEffect(() => {
        if(productCustom){
            cartChecker(productCustom)
        }
    }, [productCustom])

    return (
        <div>
            <button
                onClick={() => {
                    props.deactivate()
                }}
            >close this pop up</button>
            <form onSubmit={handleSubmit(async(form) =>{

                const ingredientsDefault = props.product.productHasIngredient

                const ingredientsChoosen = form.ingredients.map((ingredient:any) => {
                    const ingredientChoosen:any = ingredientsDefault.filter((x:any) => {
                        if (x.ingredient.id === parseInt(ingredient)) {
                            return x
                        }
                    })
                    return ingredientChoosen[0]
                })    
                
                setIngredientsChoosen(ingredientsChoosen)
            })}>
                <div>
                    <label htmlFor="name">{props.product.name}</label>
                </div>
                <div>
                    <label htmlFor="price">{props.product.price}</label>
                </div>
                <div>
                    {
                        props.product.productHasIngredient.map((ingredient:any) => {
                            return(
                                <div key={ingredient.ingredient.id}>
                                    <label htmlFor="ingredients">{ingredient.ingredient.name}</label>
                                    <input id='ingredients' value={ingredient.ingredient.id} defaultChecked type="checkbox" {...register("ingredients")} />
                                </div>
                            )
                        })
                    }
                </div>
                <input type="submit" value="Create this article"/>
            </form>
        </div>
    )
} 

export default CommandSingle