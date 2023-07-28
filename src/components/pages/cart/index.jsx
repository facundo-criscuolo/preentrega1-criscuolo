import React from "react";
import { useContext } from "react";
import { CartContext } from "../../../context/cart-context";
import "./styles.css";

function Cart () {

    const {cart, onAddToCart, onDecreaseItem, onRemoveCartItem, getCartTotalQuantity, total } = useContext(CartContext);

    return (

        <div>
        <h2 className="headerTitleCard">Cart</h2>
            <div className="cartContainer">
                    {cart.length === 0 && <h3>Cart is Empty</h3>}
                    {
                    cart?.length > 0 && cart.map((product) => (
                        <div key={product.id} className='cartItem'>
                        <div className="cartImageContainer">
                            <img className="cardImage" src={product.image} />
                        </div>
                        <div className="cartContentContainer">
                            <p className="cartName">{product.name}</p>
                            <p><span className="cartQuantity">Qty: {product.quantity}</span><span className="cartStock">Stock: {product.stock}</span><span className="cartPrice">USD {product.price}</span></p>
                            <p className="cartSubTotalItem">Subtotal Item: USD {(product.quantity * product.price)}</p>
                            <button onClick={() => onAddToCart(product.id)} className="cartAddButton" type="button">+</button>
                            <button onClick={() => onDecreaseItem(product.id)} className="cartDecreaseButton" type="button">-</button>
                            <button onClick={() => onRemoveCartItem(product.id)} className="cartDeleteButton" type="button">Remove</button>
                        </div>
                        </div>

                    ))
                    }

            </div>
          <div className="cartSubTotalContainer">
                {
                  cart?.length > 0 && (
                    <>
                        <h3 className="cartSubtotal">Subtotal: USD {total}<span class="cartTotalQuantity"> Items in Cart: {getCartTotalQuantity()}</span></h3> 
                        
                    </>
                  )
                } 
          </div>

        
        </div>
    )

}

export default Cart;