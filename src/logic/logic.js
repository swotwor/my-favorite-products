import ky from 'ky';
import { setAppData, setProductItem, deleteProduct } from '../store/store';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const access_token = document.cookie.split(';')[0].split('=')[1];
const fileName = `${Date.now()}`

export async function addNewProduct(file = null, productInfo, dispatch, Resizer, userData) {
    const fileBeforCompression = await compressImage(file, Resizer);
    const linkImage = await uploadImage(fileBeforCompression);

    try {
        const response = await ky
            .put(`https://61ed9b4c634f2f00170cec9d.mockapi.io/products/${userData.id}`, {
                json: {
                    ...userData,
                    dataBase:{
                        productItems: [
                            ...userData.dataBase.productItems,
                            {
                                id: '1',
                                img: linkImage,
                                ...productInfo,
                            }
                        ]
                    }
                },
            })
            .json();
        // dispatch(setProductItem(response));
        // window.location.replace('/');
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

export async function getAppData() {
    const response = await ky
    .get('https://61ed9b4c634f2f00170cec9d.mockapi.io/products')
    .json();
    return response
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
        console.log(err);
    }
}

export async function uploadImage(file) {
    const storage = getStorage();
    const storageRef = ref(storage, fileName);

    uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(url => {
            return url;
        })
    });
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
                .post('https://61ed9b4c634f2f00170cec9d.mockapi.io/products', {
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

// function extractImageId(url) {
//     const startIndex = url.lastIndexOf('/') + 1; // Находим индекс последнего слеша
//     const endIndex = url.lastIndexOf('.'); // Находим индекс точки перед расширением файла
//     return url.substring(startIndex, endIndex); // Извлекаем часть строки между индексами
//   }