import "./App.css";
import Header from "../src/components/header/index";
import { Route, Routes } from "react-router-dom";
import Card from "./components/products/card";
import Details from './components/products/details';
import Input from "./components/Input";
import { useFetch } from "./hooks/useFetch";
import { useState } from 'react';
import { API_URLS } from "./constants";


function App() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  //const [products, setProducts] = useState([]); // Estado listado Productos
  const [showDetails, setShowDetails] = useState(false); 
  const [productDetail, setProductDetail] = useState(null);
  const [productFiltered, setProductFiltered] = useState([]); // Estado adicional para filtrar productos
  

  const { data: products } = useFetch( API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config ); 

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
    setShowDetails(true);
    const findProduct = products.find((product) => product.id === id);
    setProductDetail(findProduct);
  }

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const response = await fetch('https://6499986179fbe9bcf83f91bf.mockapi.io/products', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       const data = await response.json();

  //       setProducts(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getProduct();
  // }, [])


  return (
    <div>
      <Header logo="criscuolo.tech" />

      <div className='contentContainer'>
        {showDetails ? (
            <>
              <div className='detailContainer'>
                <Details {...productDetail}/>
              </div>
              <div className="headerDetailContainer">
                  <button onClick={() => setShowDetails(false)} className='backButton'>⇦ Back</button>
              </div>
            </>
        ) : (
          <>
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
            </> 
        )}
        
        </div>  
    </div>
  )
}

export default App