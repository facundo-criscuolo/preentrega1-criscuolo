import { getFirestore, collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";

export const firebaseServices = {
    createOrder: async (order) => {
        try{
            const db = getFirestore();
            const orderCollection = collection(db, 'orders');
            const orderCreated = await addDoc(orderCollection, order);
            return orderCreated;
        } catch (error) {
            return { error: error.message }
        }
    },
    createCart: async (cart) => {
        try {
            const db = getFirestore();
            const cartCollection = collection(db, 'carts');
            const createdCart = await addDoc(cartCollection, cart);
            return {
                id: createdCart.id
            }
        } catch (error) {
            return { error }
        }
    },
    updateCart: async (cartId) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'carts', cartId);
            const data = {
                status: 'completed'
            }

            await updateDoc(docRef, data);

        } catch (error) {
            return { error }
        }
    },
    getCartById: async (cartId) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'carts', cartId);
            const result = await getDoc(docRef);
            return result.data()
        } catch (error) {
            return { error }
        }
    },
}

