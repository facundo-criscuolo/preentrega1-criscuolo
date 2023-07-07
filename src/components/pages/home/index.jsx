import "./styles.css";
import Header from "../../header";
import Card from "../../products/card";
import Details from '../../products/details';
import Input from "../../Input";
import Loader from "../../loader";
import ProductDetail from "../product-detail";
import { useState } from 'react';
import { useFetch } from "../../../hooks/useFetch";
import { API_URLS } from "../../../constants";
import { useNavigate } from "react-router-dom";



function Home() {
    const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  //const [products, setProducts] = useState([]); // Estado listado Productos
  const [showDetails, setShowDetails] = useState(false); 
  const [productDetail, setProductDetail] = useState(null);
  const [productFiltered, setProductFiltered] = useState([]); // Estado adicional para filtrar productos
  

  const { data: products, loading, error } = useFetch( API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config ); 

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

  return (
    <div>
      <div className='contentContainer'>
    
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
                {loading && <Loader ></Loader>}
                {error && <h3>{error}</h3>}
                {search.length > 0 && productFiltered.length === 0 && <h3>Product not found =( </h3>}
              </div>

              <div className='cardContainer'>
                {
                  search.length > 0 ? (
                    productFiltered.map((product) => (
                      <Card {...product} onShowDetails={onShowDetails}/>
                      ))
                    ) : (
                    products.map((product) => (
                      <Card {...product} onShowDetails={onShowDetails}/>
                    ))
                    )
                }
              </div>
        </div>  
    </div>
  )
}

export default Home