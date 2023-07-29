import "./styles.css";
import { useParams } from "react-router-dom";
import { API_URLS } from "../../../constants";
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../context/cart-context";
import Card from "../../products/card";

const Category = () => {

    const { categoryId } = useParams();
    const urlCategories = API_URLS.CATEGORIES.url;
    const urlProducts = API_URLS.PRODUCTS.url;
    const navigate = useNavigate();
    const history = window.history;

    const { onAddToCart } = useContext(CartContext);

    const { data: categories, loading: loadingCategories, error: errorCategories } = useFetch(urlCategories, API_URLS.CATEGORIES.config);
    const { data: products, loading: loadingProducts, error: errorProducts } = useFetch(urlProducts, API_URLS.PRODUCTS.config);

    console.log()

    const category = categories?.find(cat => cat.id === categoryId);
    const categoryName = category ? category.name : "";

    const filteredProducts = products?.filter(product => product.category === categoryName);

    return (
        <>
            <div className="headerTitleContainer">
                <h2 className='headerTitleCard'>{categoryName}</h2>
            </div>
            <div className='cardContainer'>
                {loadingProducts ? "Loading..." : (
                    filteredProducts.map(product => (
                        <Card key={product.id} {...product} onShowDetails={() => navigate(`/products/${product.id}`)} onAddToCart={onAddToCart}  />
                    ))
                )}
            </div>

            <div className="headerDetailContainer">
                {history.length > 2 ? 
                <button onClick={() => navigate(-1)} className='backButton'>⇦ Back</button> : null }
            </div>
        </>
    )
}

export default Category;
