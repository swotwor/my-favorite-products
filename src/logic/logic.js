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
    // try {
    //     const response = await ky
    //         .post('https://api.dropboxapi.com/2/files/list_folder', {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization:
    //                     `Bearer ${document.cookie.split(';')[0].split('=')[1]}`,
    //             },
    //             // body: {},
    //             json: {"path": ""},
    //         })
    //         .json();
    //     console.log(response);
    // } catch (error) {
    //     console.log('Error', error);
    // }
    try {
        const response = await ky
            .post(
                'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${
                            document.cookie.split(';')[0].split('=')[1]
                        }`,
                    },
                    json: {
                        path: '/photo.jpg',
                        settings: {
                            access: 'viewer',
                            allow_download: true,
                            audience: 'public',
                            requested_visibility: 'public',
                        },
                    },
                }
            )
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

export async function uploadFile(formData, name) {
    const requestParams = {
        "autorename": true,
        "mode": "add",
        // "mute": false,
        "path": `/${name}`,
        "strict_conflict": false
      };

    const requestParamsJSON = JSON.stringify(requestParams);

    try {
        const response = await ky
            .post('https://content.dropboxapi.com/2/files/upload', {
                headers: {
                    'Content-Type': 'application/octet-stream',
                    Authorization: `Bearer ${document.cookie.split(';')[0].split('=')[1]}`,
                    'Dropbox-API-Arg': requestParamsJSON,
                },
                body: formData,
                json: {},
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
                console.log(data)
                document.cookie = `access_token=${data.access_token}`;
                // document.cookie = `account_id=${data.account_id}`;
            })
            .catch((error) => {
                console.error(
                    'Ошибка при обработке ответа авторизации:',
                    error
                );
            });
    }
};
