import ky from 'ky';
import { setAppData, setProductItem, deleteProduct, setLoader } from '../store/store';
import { REQUEST_ADDRESS_MOCAPI } from '../../state';

const access_token = document.cookie.split(';')[0].split('=')[1];

export async function addNewProduct(file = null, productInfo, dispatch, Resizer, userData) {
    dispatch(setLoader());
    const fileBeforCompression = await compressImage(file, Resizer);
    const { link, deletehash } = await uploadImage(fileBeforCompression, dispatch);

    try {
        const response = await ky
            .put(`${REQUEST_ADDRESS_MOCAPI}${userData.id}`, {
                json: {
                    ...userData,
                    dataBase:{
                        ...userData.dataBase,
                        productItems: [
                            ...userData.dataBase.productItems,
                            {
                                id: extractImageId(link),
                                img: link,
                                ...productInfo,
                                deletehash,
                            }
                        ]
                    }
                },
            })
            .json();
        dispatch(setProductItem(response));
        dispatch(setLoader());
        window.location.replace('/');
    } catch (error) {
        dispatch(setLoader());
        alert(error);
    }
}

export async function editCurrentProduct(stateProduct, dispatch, userData, changeCardStatus) {
    dispatch(setLoader());
    const newProductList = userData.dataBase.productItems.map(item => {
        if (item.id === stateProduct.id) {
            return {
                ...stateProduct,
            };
        } else {
            return item;
        }
    });

    try {
        const response = await ky
            .put(`${REQUEST_ADDRESS_MOCAPI}${userData.id}`, {
                json: {
                    ...userData,
                    dataBase:{
                        ...userData.dataBase,
                        productItems: [...newProductList]
                    }
                },
            })
            .json();
        sessionStorage.setItem('productItem', JSON.stringify(...newProductList));
        dispatch(setProductItem(response));
        dispatch(setLoader());
        changeCardStatus();
    } catch (error) {
        dispatch(setLoader());
        console.log(error);
    }
}

export async function getAppData() {
    const response = await ky
    .get(`${REQUEST_ADDRESS_MOCAPI}`)
    .json();
    return response
}

export const extractTokenAndUsername = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const result = {};
    
    for (const [key, value] of params.entries()) {
        result[key] = value;
    }

    if(Object.keys(result).length) {
        document.cookie = `access_token=${result.access_token}`;
        localStorage.setItem('userName', JSON.stringify(result.account_username));
        window.location.replace('/');
    }
}

export async function deleteProductRequest(currentProductCard, appData, dispatch) {
    dispatch(setLoader());
    const deleteFoto = await deleteProductPhotoRequest(currentProductCard.deletehash, dispatch);
    const deleteProductInfo = await deleteProductInfoRequest(appData, currentProductCard.id, dispatch);

    if (deleteFoto && deleteProductInfo.id) {
        dispatch(deleteProduct(deleteProductInfo.dataBase.productItems));
        sessionStorage.removeItem('productItem');
        dispatch(setLoader());
        window.location.replace('/');
    } else {
        dispatch(setLoader());
    }
}

async function deleteProductPhotoRequest(imageHash, dispatch) {
    try {
        const response = await ky
        .delete(`https://api.imgur.com/3/image/${imageHash}`, {
            headers: {
                authorization: `Bearer ${access_token}`,
            },
        })
        .json();
        return response.success
    } catch (error) {
        alert(error);
        dispatch(setLoader());
    }
}

async function deleteProductInfoRequest(appData, productId, dispatch) {
    const filteredProducts = appData.dataBase.productItems.filter(item => item.id !== productId);

    try {
        const response = await ky
            .put(`${REQUEST_ADDRESS_MOCAPI}${appData.id}`, {
                json: {
                    ...appData,
                    dataBase:{
                        ...appData.dataBase,
                        productItems: [...filteredProducts]
                    }
                },
            })
            .json();
        return response;
    } catch (error) {
        dispatch(setLoader());
        alert(error);
    }
}

async function compressImage(file, Resizer) {
    const resizeFile = (fileImg) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                fileImg,
                600,
                600,
                'JPEG',
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                'file'
            );
        });

    try {
        const image = await resizeFile(file);
        return image;
    } catch (err) {
        alert(err);
    }
}

async function uploadImage(file, dispatch) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await ky
        .post('https://api.imgur.com/3/image/', {
            headers: {
                authorization: `Bearer ${access_token}`,
            },
            body: formData,
        })
        .json();

        return response.data;
    } catch (error) {
        dispatch(setLoader());
        alert('Error', error);
    }
}

export async function checkUserInDataBase(dispatch) {
    const appData = await getAppData(); // получаем всех пользователей из базы данных
    const userName = localStorage.getItem('userName'); // после авторизации, получаем userName пользователя
    const parseUserName = JSON.parse(userName ? userName : null);
    const isUserInDataBase = appData.filter(item => item.userName === parseUserName); // ищем пользователя в базе данных
    const productExample = {
        userName: JSON.parse(userName ? userName : null),
        dataBase: {
            productItems: [],
            categories: [],
            lists: [],
            recipes: [],
        },
    };

    if (isUserInDataBase.length === 0 && !!access_token) {
        // если пользователя нет в базе данных но есть токен авторизации - создаем нового пользователя
        console.log('Пользователя нет в базе данных')
        try {
            const response = await ky
                .post(`${REQUEST_ADDRESS_MOCAPI}`, {
                    json: productExample,
                })
                .json();
                dispatch(setAppData(response));
        } catch (error) {
            alert(error)
        }
    } else if (isUserInDataBase.length === 1 && !!access_token) {
        // если есть пользователь в базе данных и есть токен авторизации - загружаем данные в приложение
        console.log('Пользователь есть в базе данных')
        dispatch(setAppData(isUserInDataBase[0]));
        localStorage.setItem('appData', JSON.stringify(isUserInDataBase));
    }

}

function extractImageId(url) {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const id = lastPart.split('.')[0];
    return  id;
}

export function filteredListProduct() {
    
}