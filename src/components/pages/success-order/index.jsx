import { useLocation } from "react-router-dom";
import "./styles.css";


const SuccessOrder = () => {

    const location = useLocation();
    const { orderId } = location.state;

    console.log({orderId})

    return (
        <>
            <h2 className="headerTitleCard">Success</h2>
            <div className="successContainer">
                <h3 className="orderNumber"> Thank you so much for your purchase =)</h3>
                <p className="orderNumber">Please, see important information below:  </p>
                <div className="successInfoContainer">
                    <p className="orderNumber">Your order number is: <span>{orderId}</span> </p>
                    <p className="orderNumber">You will recibe an email with delivery instructions. </p>

                </div>
            </div>
        </>
    )
}

export default SuccessOrder