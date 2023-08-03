import "./styles.css";
import Card from "../../products/card";
import { useParams } from "react-router-dom";
import { API_URLS } from "../../../constants";
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../../../context/cart-context";
import { useState } from "react";

const Category = () => {

    const { categoryId } = useParams();
    const urlCategories = API_URLS.CATEGORIES.url;
    const urlProducts = API_URLS.PRODUCTS.url;
    const navigate = useNavigate();
    const history = window.history;

    const { onAddToCart, setProducts } = useContext(CartContext);
    const [ prevFilteredProducts, setPrevFilteredProducts ] = useState(null);

    const { data: categories, loading: loadingCategories, error: errorCategories } = useFetch(urlCategories, API_URLS.CATEGORIES.config);
    const { data: products, loading: loadingProducts, error: errorProducts } = useFetch(urlProducts, API_URLS.PRODUCTS.config);

    const category = categories?.find(cat => cat.id === categoryId);
    const categoryName = category ? category.name : "";

    const filteredProducts = products?.filter(product => product.category === categoryName);

    useEffect(() => {
        if (JSON.stringify(filteredProducts) !== JSON.stringify(prevFilteredProducts)) {
            setProducts(filteredProducts);
            setPrevFilteredProducts(filteredProducts);
        }
    }, [filteredProducts]);

    return (
        <>
            <div className="headerTitleContainer">
                <h2 className='headerTitleCard'>{categoryName}</h2>
            </div>
            <div className='cardContainer'>
                {filteredProducts.map(product => (
                    <Card key={product.id} {...product} onShowDetails={() => navigate(`/products/${product.id}`)} onAddToCart={() => product.id ? onAddToCart(product.id) : null}  />
                ))}
            </div>
            <div className="headerDetailContainer">
                {history.length > 2 ? 
                <button onClick={() => navigate(-1)} className='backButton'>⇦ Back</button> : null }
            </div>
        </>
    )
}

export default Category;
