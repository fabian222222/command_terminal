import { useContext, useState, useEffect } from "react"
import { IngredientContext } from "../../Providers/Ingredients/IngredientProvider"
import { CartContext } from "../../Providers/Cart/CartProvider"
import { getProducts } from "../../Services/ProductApi"
import CommandSingle from "../../Components/Client/CommandSingle"
import { Product } from "../../Interfaces/Product"

const ProductsClient = () => {

    const {ingredients} = useContext(IngredientContext)
    const {cart, setCart} = useContext(CartContext)
    const [products, setProducts] = useState([])  
    const [productsAvailability, setProductsAvailability] = useState([])
    const [productLoading, setProductLoading] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [product, setProduct] = useState()

    const productAction = async () => {
        const productsApi = await getProducts()
        setProducts(productsApi.products)
        setProductLoading(true)
    }

    useEffect(() => {
        productAction()
    }, [])

    const productCheck = () => {
        return products.map((product:any) => {

            if (product.productHasIngredient.length > 0) {
                const productIngredientsLength = product.productHasIngredient.length
                const productIngredients = product.productHasIngredient
                let ingredientAvailableCounter = 0

                for (let index = 0; index < productIngredientsLength ; index++) {
                    const ingredientId = productIngredients[index].ingredient.id
                    const ingredientCheck = ingredients.filter((ingredient:any) => {
                        return ingredient.id === ingredientId && ingredient.quantity > 0
                    })
                    if (ingredientCheck.length > 0) {
                        ingredientAvailableCounter++
                    }
                }

                if (ingredientAvailableCounter === productIngredientsLength) {
                    return product = {...product, available:true}
                } else {
                    return product = {...product, available:false}
                }
            } 
            
            if (product.productHasIngredient.length === 0) {
                return product = {...product, available:false}
            }

        })
    }

    const cartChecker = (productToAdd:any) => {
        const productFinder = cart.find((product:any) => {
            return product.product.id === productToAdd.id
        })

        if (productFinder) {
            const update = cart.map((updateItem:any) => {
                if (updateItem.product.id === productToAdd.id) {
                    updateItem.quantity += 1
                }
                return updateItem
            })
            return setCart([...update])
        } else {
            setCart([...cart, {product:productToAdd, quantity: 1}])
        }
    }

    useEffect(() => {
        const availableProducts = productCheck()
        setProductsAvailability(availableProducts)
    }, [ingredients])
    
    if (productsAvailability.length > 0 && productLoading) {
        return (
            <div>
                {productsAvailability.map((product:any) => {
                    if (product.available === true) {
                        return (
                            <div key={product.id}>
                                true
                                <button onClick={() => { cartChecker(product) }}>Add to basket</button>
                                <button onClick={() => {
                                    setProduct(product) 
                                    setPopUp(true)
                                }}>Change product</button>
                                
                            </div>
                        )
                    }else {
                        return (
                            <div key={product.id}>
                                false
                            </div>
                        )
                    }
                })}
                {
                    popUp && <CommandSingle product={product} deactivate={()=>{setPopUp(false)}} action={"add"} />
                }
            </div>
        )
    } else {
        return(
            <div>
                wait
            </div>
        )
    }

}

export default ProductsClient