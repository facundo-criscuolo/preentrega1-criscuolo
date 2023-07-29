import React from "react";
import { useContext } from "react";
import { CartContext } from "../../../context/cart-context";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Cart () {

    const {cart, onAddToCart, onDecreaseItem, onRemoveCartItem, getCartTotalQuantity, total } = useContext(CartContext);
    const navigate = useNavigate();
    const history = window.history;

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
                        <div className="cartActionsContainer">
                            <h3 className="cartSubtotal">Subtotal: USD {total}</h3> 
                            <p className="cartTotalQuantity"> Items in Cart: {getCartTotalQuantity()}</p>
                            <button type="button" className="cartActionsCheckout">Go To Checkout</button>
                        </div>

                        <div className="headerDetailContainer">
                            {history.length > 2 ? 
                            <button onClick={() => navigate(-1)} className='backButton'>⇦ Back</button> : null }
                        </div>
                        
                    </>
                  )
                } 
          </div>

        
        </div>
    )

}

export default Cart;