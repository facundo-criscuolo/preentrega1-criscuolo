import './styles.css';
import { useContext } from 'react';
import { CartContext } from "../../../context/cart-context";
import { useNavigate } from 'react-router-dom';


const Details = ({ id, image, name, category, description, price, stock }) => {

    const { onAddToCart } = useContext(CartContext)
    const navigate = useNavigate();

    const onBuyNow = () => {
        navigate('/cart')
    }

    return (
        <div className='detail'>
            <div className='col1'> 
                <img className='detailImage' src={image} alt={name} />
            </div>
            <div className='col2'> 
                <div className='detailContent'>
                    <h3 className='detailName'>{name}</h3>
                    <p className='detailPrice'>USD {price} <span className='detailStock'>({stock} left)</span></p>
                    <p className='detailCategory'>{category}</p>
                    <p className='detailDescription'>{description}</p>
                </div>
                <div className='detailActions'>
                    <button onClick={() => onAddToCart(id)} className='detailButton'>Add to cart</button>
                    <button onClick={() => onBuyNow()} className='detailButton'>Buy Now</button>

                </div>
            </div>

        </div>
    )
}

export default Details;