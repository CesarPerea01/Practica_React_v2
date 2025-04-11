import { createContext, useReducer } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext()

const initalState = []
const reducer = (state, action) =>{
    const {type: actionType ,payload: actionPayload} = action

    switch(actionType){
        case 'ADD_TO_CART':{
            const {id} = actionPayload
            const productInCartIndex = state.findIndex(item => item.id == id)

            if (productInCartIndex >=0){
                //una forma es usar structuredClone
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity +=1
                return newState
            }

            return[
                ...state, //producto
                {
                    ...actionPayload,
                    quantity: 1
                }
            ]
        }
        case 'REMOVE_FROM_CART':{
            const{id}=actionPayload
            return state.filter(item => item.id !=id)
        }

        case 'CLEAR_CART':{
            return initalState
        }
    }
    return state 
}

export function CartProvider({children}){
/*     const[cart, setCart] = useState([]) */
    const [state,dispatch] = useReducer(reducer, initalState)

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = product =>dispatch({
        type: 'CLEAR_CART',
        payload: product
    })

/*     const addToCart = product =>{
        const productInCartIndex = cart.findIndex(item => item.id == product.id)

        //checar si el producto esta en el carrito
        if (productInCartIndex >=0){
            //una forma es usar structuredClone
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity +=1
            return setCart(newCart)
        }

        //producto no esta en el carrito
        setCart(prevState =>([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))
    } */

/*     const removeFromCart = (product) => {
        setCart(prevState => prevState.filter(item=>item.id != product.id))
    } */

    /* const clearCart = ()=>{
        setCart([])
    } */

    return(
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}