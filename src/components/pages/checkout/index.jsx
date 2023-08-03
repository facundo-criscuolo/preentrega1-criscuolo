import "./styles.css";
import Input from "../../Input";
import { useForm } from "../../../hooks/useForm";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../../context/cart-context";
import { firebaseServices } from "../../../services/firebase";
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from "../../../hooks/useQuery";

const initialState = {
    name: {value: '', error: '', hasError: true, active: false, name: 'name'},
    last: {value: '', error: '', hasError: true, active: false, name: 'last'},
    email: {value: '', error: '', hasError: true, active: false, name: 'email'},
    address: {value: '', error: '', hasError: true, active: false, name: 'address'},
    document: {value: '', error: '', hasError: true, active: false, name: 'document'},
    postalcode: {value: '', error: '', hasError: true, active: false, name: 'postalcode'},
    isFormValid: false,
}

const Checkout = () => {

    const [formState, inputHandler, inputFocus, inputBlur, clearInputs] = useForm(initialState);
    const {cart, total, setCart} = useContext(CartContext);
    const { state } = useLocation();
    const navigate = useNavigate();
    let query = useQuery();

    useEffect(() => {
       
        const cartId = query.get("cartId") 
        
        if(query.get("cartId")) {
            const getCart = async () => {
                const cart = await firebaseServices.getCartById(cartId)
                return cart
            }
            getCart()
                .then((cart) => {
                    setCart(cart.items)
                })
                .catch((error) => {
                    console.log({error})
                })
        }

    }, [query])


    const onChange = (event) => {
        const { name, value } = event.target
        inputHandler({ name, value })
    }

    const onFocus = ({ name }) => {
        inputFocus({ name })
    }

    const onBlur = ({ name }) => {
        inputBlur({ name })
    }

    const onHandlerOrder = async () => {
        const newOrder = {
            buyer: {
                name: formState.name.value,
                last: formState.last.value,
                email: formState.email.value,
                address: formState.address.value,
                document: formState.document.value,
                postalcode: formState.document.value,
            },
            createdAt: new Date(),
            items: cart,
            payment: {
                currency: 'USD',
                method: 'CASH',
                type: 'CASH'
            },
            seller: {
                name: 'Juan',
                phone: '123123123',
                email: 'juan@juan.com',
            },
            shipping: {
                deliveryDay: new Date() + 7,
                trackingNumber: '0000001',
                type: 'DELIVERY'
            },
            total: total
        }
        
        const orderId = await firebaseServices.createOrder(newOrder);
        await firebaseServices.updateCart(state?.cartId);
        return orderId;
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const orderId = await onHandlerOrder();
        clearInputs({ formState })
        navigate('/success-order', { state: { orderId: orderId.id } })
    }
 
    return (

        <div className="checkoutContainer">
            <div className='checkoutDetailContainer'>
                <div className='checkoutFormContainer'>
                    <h1 className='checkoutTitle'>Checkout</h1>
                    <form onSubmit={onSubmit} className="checkoutForm">
                        <div className="checkoutFormContent">
                            <div className='inputContainer'>
                                <Input 
                                    placeholder='Your Name'
                                    id='name'
                                    name='name'
                                    required={true}
                                    label='name'
                                    onChange={onChange}
                                    onFocus={() => onFocus({ name: 'name' })}
                                    onBlur={() => onBlur({ name: 'name' })}
                                    active={formState.name.active}
                                    error={formState.name.error}
                                    hasError={formState.name.hasError}
                                />
                             </div>
                             <div className='inputContainer'>
                                <Input 
                                    placeholder='Your Last'
                                    id='last'
                                    name='last'
                                    required={true}
                                    label='last'
                                    onChange={onChange}
                                    onFocus={() => onFocus({name: 'last' })}
                                    onBlur={() => onBlur({name: 'last' })}
                                    active={formState.last.active}
                                    error={formState.last.error}
                                    hasError={formState.last.hasError}
                                />
                             </div>                           
                              <div className='inputContainer'>
                                <Input 
                                    placeholder='Your Email'
                                    id='email'
                                    name='email'
                                    required={true}
                                    label='email'
                                    onChange={onChange}
                                    onFocus={() => onFocus({ name: 'email' })}
                                    onBlur={() => onBlur({name: 'email' })}
                                    active={formState.email.active}   
                                    error={formState.email.error}
                                    hasError={formState.email.hasError}                             
                                    />
                             </div>                                                   
                             <div className='inputContainer'>
                                <Input 
                                    placeholder='Your Address'
                                    id='address'
                                    name='address'
                                    required={true}
                                    label='address'
                                    onChange={onChange}
                                    onFocus={() => onFocus({ name: 'address' })}
                                    onBlur={() => onBlur({name: 'address' })}
                                    active={formState.address.active}     
                                    error={formState.address.error}
                                    hasError={formState.address.hasError}                          
                                     />
                             </div>                            
                             <div className='inputContainer'>
                                <Input 
                                    placeholder='Your ID Number'
                                    id='document'
                                    name='document'
                                    required={true}
                                    label='document'
                                    onChange={onChange}
                                    onFocus={() => onFocus({ name: 'document' })}
                                    onBlur={() => onBlur({ name: 'document' })}
                                    active={formState.document.active}                                    
                                />
                                    
                             </div>
                             <div className='inputContainer'>
                                <Input 
                                    placeholder='Your Postal Code'
                                    id='postalcode'
                                    name='postalcode'
                                    required={true}
                                    label='postalcode'
                                    onChange={onChange}
                                    onFocus={() => onFocus({ name: 'postalcode' })}
                                    onBlur={() => onBlur({ name: 'postalcode' })}
                                    active={formState.postalcode.active}                               
                                     />
                             </div>                   
                        </div>
                        <div className="checkoutActionsContainer">
                            <button disabled={!formState.isFormValid} type='submit' className='butttonCheckout'>Checkout</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
                            


    )
}


export default Checkout;