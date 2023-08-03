import "./styles.css";
import Details from "../../products/details";
import { Navigate, useParams } from "react-router-dom";
import { API_URLS } from "../../../constants";
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

function ProductDetail() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const urlProductDetail = `${API_URLS.PRODUCTS.url}/${productId}`;
    const history = window.history;
  
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