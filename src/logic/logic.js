import ky from 'ky';
import { setProducts } from '../store/store';
import { CLIENT_ID, CLIENT_SECRET } from './../personal/index';

export async function addNewProduct(productInfo) {
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
}

export async function getCurrentAccount() {
    try {
        const response = await ky
            .post('https://https://api.dropboxapi.com/2/openid/userinfo', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer sl.BjLLCBLi0q93Fk7xeOE01jSfRdjo0ys3Z3BeUegO5X2Z62pHBlnLrA8fzx3FncpVErVVEcnoCzkI87BL1-I_qFpxAXAi4Z6fZJ810YcOpBWouCD3Tw2HqLIqvDKbruEzJbe86RAwFMar',
                },
                // json: {},
            })
            .json();
        console.log(response);
    } catch (error) {
        console.log('Error', error);
    }
}

export const getUserToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const tokenUrl = 'https://api.dropbox.com/oauth2/token';
    const formData = new FormData();
    formData.append('code', code);
    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', CLIENT_ID);
    formData.append('client_secret', CLIENT_SECRET);
    formData.append('redirect_uri', 'http://localhost:5173');

    if (code) {
        ky.post(tokenUrl, { body: formData })
            .json()
            .then((data) => {
                document.cookie = `access_token=${data.access_token}`;
            })
            .catch((error) => {
                console.error(
                    'Ошибка при обработке ответа авторизации:',
                    error
                );
            });
    }
};
