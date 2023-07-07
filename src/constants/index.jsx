const BASE_URL = 'https://6499986179fbe9bcf83f91bf.mockapi.io';

export const API_URLS = {
    PRODUCTS: {
        url: `${BASE_URL}/products`,
        config: {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }
}