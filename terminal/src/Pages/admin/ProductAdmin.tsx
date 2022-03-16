import React, {useState} from 'react'
import { useEffect } from 'react'
import AddProduct from '../../Components/Admin/Product/AddProduct'
import ProductSingle from '../../Components/Admin/Product/ProductSingle'
import { Product } from '../../Interfaces/Product'
import { getProducts } from '../../Services/ProductApi'

interface ProductWithId extends Product{
    id:number
}

const ProductAdmin = () => {

    const [products, setProducts] = useState([])

    const productsAction = async () => {
        const productsApi = await getProducts()
        setProducts(productsApi.products)
    }

    useEffect( () => {
        productsAction()
    }, [])
    
    if (products.length > 0){
        return (
            <div>
                {
                    products.map((product:ProductWithId) => {
                        return <ProductSingle key={product.id} id={product.id} name={product.name} price={product.price} custom={product.custom} ></ProductSingle>
    
                    })
                }
                <AddProduct></AddProduct>
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

export default ProductAdmin