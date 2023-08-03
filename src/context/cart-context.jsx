import { createContext, useState, useEffect } from "react";
import { API_URLS } from "../constants";
import { useFetch } from "../hooks/useFetch";

const initialState = {
    pruducts: [],
    categories: [],
    cart: [],
    setCart: () => {},
    getItemQuantity: () => {},
    getCartTotalQuantity: () => {},
    onDecreaseItem:  () => {},
    onAddToCart:  () => {},
    onRemoveCartItem: () => {},
    total: 0,
    loading: true,
    error: null,
}

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProductsState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { data: allProducts, loading: loadingProducts, error: errorProducts } = useFetch(API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config);

    useEffect(() => {
      if (!loadingProducts && allProducts) {
          setProducts(allProducts);
          setLoading(false);
      }

      if (errorProducts) {
          setError(errorProducts);
      }
  }, [loadingProducts, allProducts, errorProducts]);

    const onAddToCart = (id) => {
        const item =  products.find((product) => product.id === id);
        
        if (!item) {
          console.error(`No product found with id: ${id}`);
          return;
        }
    
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

      const getCartTotalQuantity = (id) => {
          return cart.reduce((acc, product) => acc + product.quantity, 0)
      }

      const setProducts = (newProducts) => {
        setProductsState(newProducts);
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
                setProductsState,
                setCategories,
                getItemQuantity,
                getCartTotalQuantity,
                total,
                loading,
                error
                }}>

              {children}
              
            </CartContext.Provider>

      )
}

