import { createContext, useState } from "react";

const initialState = {
    pruducts: [],
    categories: [],
    cart: [],
    setCart: () => {},
    getItemQuantity: () => {},
    onDecreaseItem:  () => {},
    onAddToCart:  () => {},
    onRemoveCartItem: () => {},
    total: 0,
}

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const onAddToCart = (id) => {
        const item =  products.find((product) => product.id === id);
    
        if(cart?.find((product) => product.id === id)?.quantity === Number(item.stock)) return;
        if(cart?.length === 0) {
          setCart([{...item, quantity: 1}])
        }
        if(cart?.length > 0 && !cart?.find((product) => product.id === id)) {
          setCart([...cart, {...item, quantity: 1}])
        }
        if(cart?.length > 0 && cart?.find((product) => product.id === id)) {
          setCart((currentCart) => {
            return currentCart.map((product) => {
              if (product.id === id) {
                return {...product, quantity: product.quantity + 1}
              } else {
                return product;
              }
            })
          })
        }
      }
    
      const onDecreaseItem = (id) => {
        const item =  products.find((product) => product.id === id);
        if(cart?.find((product) => product.id === id)?.quantity === 1) return;
        if(cart?.length > 0 && cart?.find((product) => product.id === id)) {
          setCart((currentCart) => {
            return currentCart.map((product) => {
              if (product.id === id) {
                return {...product, quantity: product.quantity - 1}
              } else {
                return product;
              }
            })
          });
        }
      }
    
      const onRemoveCartItem = (id) => {
        setCart((currentCart) => {
          return currentCart.filter((product) => product.id !== id)
        })
      }

      const total = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);

      const getItemQuantity = (id) => {
          return cart.find((product) => product.id === id)?.quantity || 0;
      }

      return (
          <CartContext.Provider 
            value={{ 
                cart, 
                setCart, 
                onDecreaseItem, 
                onAddToCart, 
                onRemoveCartItem,
                products,
                categories,
                setProducts,
                setCategories,
                getItemQuantity,
                total,
                }}>

              {children}
              
            </CartContext.Provider>

      )
}

