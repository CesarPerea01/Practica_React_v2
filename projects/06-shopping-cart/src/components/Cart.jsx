import { useId } from "react";
import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from "./Icons";
import { useCart } from "../hooks/useCart";
import './Cart.css'
import { Products } from "./Products";

export function Cart (){
    const cartCheckboxId = useId()
    const {cart, clearCart, addToCart} = useCart()

    return(
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon/>       
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden/>

            <aside className="cart">
                <ul>
                    {cart.map(product=>(
                    <li key={product.id}>
                        <img
                            src = {product.thumbnail}
                            alt = {product.title}
                        />
                        <div>
                            <strong>{product.title}</strong> - ${product.price}
                        </div>
                        <footer>
                            <small>
                                {product.quantity}
                            </small>
                            <button onClick={()=>{addToCart(product)}}>+</button>
                        </footer>
                    </li>
                    ))}
                </ul>
                <button onClick={()=>{clearCart()}}>
                    <ClearCartIcon/>
                </button>
            </aside>
        </>
    )
}