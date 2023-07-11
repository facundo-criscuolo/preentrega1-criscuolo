import { Navigate, useParams } from "react-router-dom";
import { API_URLS } from "../../../constants";
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Details from "../../products/details";
import "./styles.css";

function ProductDetail() {
    const { productId } = useParams();
    const urlProductDetail = `${API_URLS.PRODUCTS.url}/${productId}`;
    const navigate = useNavigate();
    const history = window.history;
    
    console.log({productId});
    const { data, loading, error } = useFetch( urlProductDetail, API_URLS.PRODUCTS.config ); 

    return (
            <>
              <div className='detailContainer'>
                <Details {...data}/>
              </div>
              <div className="headerDetailContainer">
                  {history.length > 2 ? 
                  <button onClick={() => navigate(-1)} className='backButton'>⇦ Back</button> : null }
              </div>
            </>
    )
}

export default ProductDetail