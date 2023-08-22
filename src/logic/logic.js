import ky from 'ky';
import { setAppData, setProductItem, deleteProduct } from '../store/store';

const access_token = document.cookie.split(';')[0].split('=')[1];

export async function addNewProduct(file = null, productInfo, dispatch, Resizer) {
    const fileBeforCompression = await compressImage(file, Resizer)
    const imageInfo = await uploadImage(fileBeforCompression);
    
    const response = await ky
    .post('https://61ed9b4c634f2f00170cec9d.mockapi.io/products', {
        json: {...productInfo.appData, img: imageInfo.link, deleteHash: imageInfo.deletehash},
    })
    .json();
    dispatch(setProductItem(response));
    window.location.replace('/');
}

export async function getAppData() {
    const response = await ky
    .get('https://61ed9b4c634f2f00170cec9d.mockapi.io/products')
    .json();
    return response
    // dispatch(setAppData(response));
    // localStorage.setItem('appData', JSON.stringify(response));
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

export async function deleteProductRequest(imageHash, id, dispatch) {
     const deleteFoto = await deleteProductPhotoRequest(imageHash);
     const deleteProductInfo = await deleteProductInfoRequest(id);

    if (deleteFoto && deleteProductInfo) {
        dispatch(deleteProduct(id));
        sessionStorage.removeItem('productItem');
        window.location.replace('/');
    }
}

async function deleteProductPhotoRequest(imageHash) {
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
        console.log(error)
    }   
    // response
    // success:true
}

async function deleteProductInfoRequest(id) {
    try {
        const response = await ky
        .delete(`https://61ed9b4c634f2f00170cec9d.mockapi.io/products/${id}`, {
            headers: {
                authorization: `Bearer ${access_token}`,
            },
        })
        .json();
        return response.title
    } catch (error) {
        console.log(error)
    }   
    // response
    // Возвращает объект который был удален
    // title: "ewrewr"
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

async function uploadImage(file) {
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
        alert('Error', error);
    }
}

export async function checkUserInDataBase(dispatch) {
    const appData = await getAppData(); // получаем всех пользователей из базы данных
    const userName = localStorage.getItem('userName'); // после авторизации, получаем userName пользователя
    const isUserInDataBase = appData.filter(item => item.userName === userName); // ищем пользователя в базе данных
    const productExample = {
        userName,
        dataBase: {
            productItems: [],
            categories: [],
            lists: [],
            recipes: [],
        },
    };

    console.log(!access_token);
    console.log(!isUserInDataBase.length);

    if (isUserInDataBase.length == 0 && !access_token) {
        // если пользователя нет и нет токена авторизации - создаем нового пользователя
        console.log('Пользователя нет в базе данных')
        try {
            const response = await ky
                .post('https://61ed9b4c634f2f00170cec9d.mockapi.io/products', {
                    json: productExample,
                })
                .json();

                dispatch(setAppData(response));
        } catch (error) {
            alert(error)
        }
    } else if (!!isUserInDataBase.length && !!access_token) {
        // если есть пользователь и токен - загружаем данные в приложение
        console.log('Пользователь есть в базе данных')
        dispatch(setAppData(isUserInDataBase[0]));
        localStorage.setItem('appData', JSON.stringify(isUserInDataBase));
    }

}