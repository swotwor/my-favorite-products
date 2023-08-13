import ky from 'ky';
import { setProducts } from '../store/store';

export async function addNewProduct(productInfo) {
    console.log(productInfo)
    const response = await ky
    .post('https://61ed9b4c634f2f00170cec9d.mockapi.io/products', {
        json: productInfo,
    })
    .json();
    console.log(response);
}

export async function getPoducts(dispatch) {
    const response = await ky
    .get('https://61ed9b4c634f2f00170cec9d.mockapi.io/products')
    .json();
    dispatch(setProducts(response));
    console.log(response)
    // localStorage.setItem('myFavProd_')
}

export async function getCurrentAccount() {
    try {
        const response = await ky
        .post('https://api.imgur.com/3/image/', {
            headers: {
                authorization: 'Bearer 7d5c54371b135406cd08087819ec156da4b9a872',
            },
        })
        .json();
        console.log(response);
    } catch (error) {
        console.log('Error', error);
    }
}

export async function getUserInfo() {
    try {
        const response = await ky
        .post('https://api.dropboxapi.com/2/users/get_account', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${
                    document.cookie.split(';')[0].split('=')[1]
                }`,
            },
            json: {},
        })
        .json();
        console.log(response);
    } catch (error) {
        console.log('Error', error);
    }
}

export async function uploadImage(formData) {
    try {
        const response = await ky
        .post('https://api.imgur.com/3/image/', {
            headers: {
                authorization: 'Bearer 7d5c54371b135406cd08087819ec156da4b9a872',
            },
            body: formData,
        })
        .json();
        console.log(response);
    } catch (error) {
        console.log('Error', error);
    }
}
        
export const extractTokenAndUsername = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const result = {};
    
    for (const [key, value] of params.entries()) {
        result[key] = value;
    }

    document.cookie = `access_token=${result.access_token}`;
    localStorage.setItem('myFavProd_userName', JSON.stringify({userName: result.account_username}));
}