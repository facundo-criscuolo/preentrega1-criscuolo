import { useParams } from "react-router-dom";
import { API_URLS } from "../../../constants";
import { useFetch } from "../../../hooks/useFetch";
import Details from "../../products/details";
import "./styles.css";

function ProductDetail() {
    const { productId } = useParams();
    const urlProductDetail = `${API_URLS.PRODUCTS.url}/${productId}`;
    
    console.log({productId});
    const { data, loading, error } = useFetch( urlProductDetail, API_URLS.PRODUCTS.config ); 

    return (
            <>
              <div className='detailContainer'>
                <Details {...data}/>
              </div>
              <div className="headerDetailContainer">
                  <button className='backButton'>⇦ Back</button>
              </div>
            </>
    )
}

export default ProductDetail