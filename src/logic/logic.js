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
                'https://api.dropboxapi.com/2/sharing/create_shared_link_with_setting',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${
                            document.cookie.split(';')[0].split('=')[1]
                        }`,
                    },
                    // body: {},
                    mode: 'no-cors',
                    json: {
                        path: 'l_ekx9pmarYAAAAAAAAABw',
                        settings: {
                            requested_visibility: { '.tag': 'public' },
                            audience: { '.tag': 'public' },
                            access: { '.tag': 'viewer' },
                            short_url: true,
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

export async function uploadFile() {
    try {
        const response = await ky
            .post('https://api.dropboxapi.com/2/files/list_folder', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer sl.BjPN29c70UIWsxn40MzpjEq3yM8g_oj4sRhzrzxdtBuz115FMXy8JNqhf5i6dXts4OE_yO_VSX-StQonuyZt4mVl4v4aV3WvaN88ibUWP7YdDkY-7SU5o0rmGLVSWcS7lDdjnyseDAYv',
                },
                // body: {},
                json: {
                    path: '',
                    mode: 'add',
                    mute: false,
                    autorename: false,
                    strict_conflict: false,
                },
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
