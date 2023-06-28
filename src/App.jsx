import "./App.css";
import Header from "../src/components/header/index";
import Card from "./components/products/card";
import { useState, useEffect } from 'react'

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch('https://6499986179fbe9bcf83f91bf.mockapi.io/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    getProduct();
  }, [])


  return (
    <div>
      <Header logo="criscuolo.tech" />

      <div className='cardContainer'>
        {
          products.map((product) => (
            <Card {...product} />
          ))
        }
        </div>

    </div>
  )
}

export default App