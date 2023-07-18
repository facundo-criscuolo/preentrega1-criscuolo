import "./styles.css";
import Header from "../../header";
import Card from "../../products/card";
import Details from '../../products/details';
import Input from "../../Input";
import Loader from "../../loader";
import ProductDetail from "../product-detail";
import Slider from "../../slider";
import { useState } from 'react';
import { useFetch } from "../../../hooks/useFetch";
import { API_URLS } from "../../../constants";
import { useNavigate } from "react-router-dom";




function Home() {
    const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  //const [products, setProducts] = useState([]); // Estado listado Productos
  const [isFiltered, setIsFiltered] = useState(false); 
  const [productDetail, setProductDetail] = useState(null);
  const [productFiltered, setProductFiltered] = useState([]); // Estado adicional para filtrar productos
  const [cart, setCart] = useState([]);
  

  const { data: products, loadingProducts, errorProducts } = useFetch( API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config ); 
  const { data: categories, loadingCategories, errorCategories } = useFetch( API_URLS.CATEGORIES.url, API_URLS.CATEGORIES.config ); 


  const filterBySearch = (query) => {
    let updateProductList = [...products];

    updateProductList = updateProductList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })

    setProductFiltered(updateProductList);
  }

  const onChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    filterBySearch(value);
  }

  const onFocus = () => {
    setActive(true);
  }

  const onBlur = () => {
    setActive(false);
  }

  const onShowDetails = (id) => {
    navigate(`/products/${id}`);
  }


  const onFilter = (name) => {
    setIsFiltered(true);
    const productsByCategory = products.filter((product => product.category === name));
    setProductFiltered(productsByCategory);
  }

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

  const onDecreaseCartItem = (id) => {
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

  return (
    <div>
      <div className='contentContainer'>

        <h2>Cart</h2>
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
                    <p className="cartQuantity">Qty: {product.quantity}<span className="cartStock">Stock: {product.stock}</span></p>
                    <p className="cartPrice">{product.price}</p>
                    <button onClick={() => onAddToCart(product.id)} className="cartAddButton" type="button">+</button>
                    <button onClick={() => onDecreaseCartItem(product.id)} className="cartDecreaseButton" type="button">-</button>
                    <button onClick={() => onRemoveCartItem(product.id)} className="cartDeleteButton" type="button">Remove</button>
                  </div>



                  </div>
              ))
            }

          </div>
        
          <div className="categoriesContainer">
                {loadingCategories && <Loader ></Loader>}
                {errorCategories && <h3>{errorCategories}</h3>}
                
                <Slider>
                  <button onClick={() => setIsFiltered(false)} type='button' className="categoryContainer">
                          <p className='categoryName'>All</p>
                  </button>
                {   
                    categories.map((category) => (
                      <button key={category.id} onClick={() => onFilter(category.name)} type='button' className="categoryContainer">
                          <p className='categoryName'>{category.name}</p>
                      </button>
                    ))
                }
                </Slider>
          </div>
    
              <h2 className='headerTitleCard'>Products</h2>
              <div className='inputContainer'>
                      <Input 
                        placeholder='find a product'
                        id='task'
                        required={true}
                        name='Search'
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        active={active}
                      />
              </div>
              
              <div className="status-container">
                {loadingProducts && <Loader ></Loader>}
                {errorProducts && <h3>{error}</h3>}
                {search.length > 0 && productFiltered.length === 0 && <h3>Product not found =( </h3>}
              </div>

              <div className='cardContainer'>
                {
                  // search.length > 0 ? (
                    isFiltered ? (
                    productFiltered.map((product) => (
                      <Card {...product} onShowDetails={onShowDetails} onAddToCart={onAddToCart}/>
                      ))
                    ) : (
                    products.map((product) => (
                      <Card {...product} onShowDetails={onShowDetails} onAddToCart={onAddToCart}/>
                    ))
                    )
                }

              </div>
              {
                  isFiltered && productFiltered.length === 0 && <h3 className="noProduct">Product not found =(</h3>
                }
        </div>  
    </div>
  )
}

export default Home