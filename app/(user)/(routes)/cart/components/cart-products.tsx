import { Cart } from "@/utils/types"
import { NoProductsCart } from "@/components/errors-response"
import { ProductCart } from "./product-cart"

interface CartProductsProps {
    cart: Cart[] 
}

export const CartProducts: React.FC<CartProductsProps> = ({ cart }) => {
    return (
        <div className="min-w-0 flex-1 rounded-sm space-y-10 lg:p-4 lg:border">
            {cart.length > 0 && (
                cart.map(({ id, product }) => (
                    <ProductCart key={id} id={id} product={product} />
                ))
            )}
            {!cart.length && <NoProductsCart />}
        </div>
    )
}