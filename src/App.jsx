import "./App.css";
import Header from "../src/components/header/index";
import Home from "./components/pages/home";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./components/pages/product-detail";
import Category from "./components/pages/category";

function App() {

  return (
    <div>
      <Header logo="criscuolo.tech" />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='products/:productId' element={<ProductDetail />} />
        <Route path='categories/:categoryId' element={<Category />} />
      </Routes>
    </div>
  )
}

export default App