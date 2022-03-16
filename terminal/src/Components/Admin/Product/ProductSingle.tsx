import { deleteProduct } from "../../../Services/ProductApi"

const ProductSingle = (props:{
    id:number,
    name:string,
    price:number,
    custom:boolean
}) => {

    const deleteAction = async (id:number) => {
        await deleteProduct(id)
    }

    return (
        <div>
            <p>{props.name}</p>
            <p>{props.price}</p>
            <p>{props.custom}</p>
            <button onClick={() => {
                deleteAction(props.id)
            }}>Delete this product</button>
        </div>
    )
}

export default ProductSingle