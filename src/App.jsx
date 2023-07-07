import "./App.css";
import Header from "../src/components/header/index";
import Home from "./components/pages/home";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./components/pages/product-detail";

function App() {

  return (
    <div>
      <Header logo="criscuolo.tech" />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='products/:productId' element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App