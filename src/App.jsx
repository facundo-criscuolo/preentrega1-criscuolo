import "./App.css";
import Header from "../src/components/header/index";
import Home from "./components/pages/home";
import ProductDetail from "./components/pages/product-detail";
import Category from "./components/pages/category";
import Cart from "./components/pages/cart";
import Checkout from "./components/pages/checkout";
import SuccessOrder from "./components/pages/success-order";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/cart-context";

function App() {

  return (
    <div>
      <CartProvider>
        <Header logo="criscuolo.tech" />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='products/:productId' element={<ProductDetail />} />
          <Route path='categories/:categoryId' element={<Category />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='success-order' element={<SuccessOrder />} />
        </Routes>
      </CartProvider>
    </div>
  )
}

export default App