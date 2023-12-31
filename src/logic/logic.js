import ky from 'ky';
import { swotwor, userDataExemple } from '../helpers/example';
import { REQUEST_ADDRESS_MOCAPI } from '../../state';
import { setLoader, setEditAppData } from '../store/store';

const access_token = document.cookie.split(';')[0].split('=')[1];

export const resetData = async () => {
    try {
        const response = await ky
            .put(`${REQUEST_ADDRESS_MOCAPI}1`, {
                json: { ...userDataExemple },
            })
            .json();
        console.log(response);
    } catch (error) {
        alert(error);
    }
};

// export const resetMyData = async () => {
//     try {
//         const response = await ky
//             .post(`https://64ef3e20219b3e2873c42f34.mockapi.io/products`, {
//                 json: swotwor,
//             })
//             .json();
//         console.log(response);
//     } catch (error) {
//         alert(error);
//     }
// };

export async function addNewProduct(
    file = null,
    productInfo,
    dispatch,
    Resizer,
    userData
) {
    dispatch(setLoader());
    const fileBeforCompression = await compressImage(file, Resizer);
    const { link, deletehash } = await uploadImage(
        fileBeforCompression,
        dispatch
    );

    try {
        const response = await ky
            .put(`${REQUEST_ADDRESS_MOCAPI}${userData.id}`, {
                json: {
                    ...userData,
                    dataBase: {
                        ...userData.dataBase,
                        productItems: [
                            ...userData.dataBase.productItems,
                            {
                                id: extractImageId(link),
                                img: link,
                                ...productInfo,
                                deletehash,
                            },
                        ],
                    },
                },
            })
            .json();
        dispatch(setEditAppData(response));
        dispatch(setLoader());
        window.location.replace('/');
    } catch (error) {
        dispatch(setLoader());
        alert(error);
    }
}

export async function editCurrentProduct(
    stateProduct,
    dispatch,
    userData,
    changeCardStatus
) {
    dispatch(setLoader());
    const newProductList = userData.dataBase.productItems.map((item) => {
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
                    dataBase: {
                        ...userData.dataBase,
                        productItems: newProductList,
                    },
                },
            })
            .json();
        sessionStorage.setItem(
            'productItem',
            JSON.stringify(...newProductList)
        );
        dispatch(setEditAppData(response));
        dispatch(setLoader());
        changeCardStatus();
    } catch (error) {
        dispatch(setLoader());
        console.log(error);
    }
}

export async function getAppData() {
    const response = await ky.get(`${REQUEST_ADDRESS_MOCAPI}`).json();
    return response;
}

export const extractTokenAndUsername = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const result = {};

    for (const [key, value] of params.entries()) {
        result[key] = value;
    }

    if (Object.keys(result).length) {
        document.cookie = `access_token=${result.access_token}`;
        localStorage.setItem(
            'userName',
            JSON.stringify(result.account_username)
        );
        window.location.replace('/');
    }
};

export async function deleteProductRequest(
    currentProductCard,
    appData,
    dispatch
) {
    dispatch(setLoader());
    const deleteFoto = await deleteProductPhotoRequest(
        currentProductCard.deletehash,
        dispatch
    );
    const deleteProductInfo = await deleteProductInfoRequest(
        appData,
        currentProductCard.id,
        dispatch
    );

    if (deleteFoto && deleteProductInfo.id) {
        dispatch(setEditAppData(deleteProductInfo));
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
        return response.success;
    } catch (error) {
        alert(error);
        dispatch(setLoader());
    }
}

async function deleteProductInfoRequest(appData, productId, dispatch) {
    const filteredProducts = appData.dataBase.productItems.filter(
        (item) => item.id !== productId
    );
    const filteredListProducts = appData.dataBase.lists.map((mapItem) => {
        return {
            ...mapItem,
            productList: mapItem.productList.filter(
                (filterItem) => filterItem.id !== productId
            ),
        };
    });

    try {
        const response = await ky
            .put(`${REQUEST_ADDRESS_MOCAPI}${appData.id}`, {
                json: {
                    ...appData,
                    dataBase: {
                        ...appData.dataBase,
                        productItems: filteredProducts,
                        lists: filteredListProducts,
                    },
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
    const isUserInDataBase = appData.filter(
        (item) => item.userName === parseUserName
    ); // ищем пользователя в базе данных
    const productExample = {
        userName: JSON.parse(userName ? userName : null),
        dataBase: {
            productItems: [],
            categories: [
                { id: 1, title: 'Алкоголь' },
                { id: 2, title: 'Балаклія' },
                { id: 3, title: 'Гігієна' },
                { id: 4, title: 'Заморозка' },
                { id: 5, title: 'Зоотовари' },
                { id: 6, title: 'Йогурти' },
                { id: 7, title: 'Ковбаси' },
                { id: 8, title: 'Консервація' },
                { id: 9, title: 'Кулінарія' },
                { id: 10, title: 'Молоко Яйця' },
                { id: 11, title: 'Морепродукти' },
                { id: 12, title: 'Морозиво' },
                { id: 13, title: "М'ясні вироби" },
                { id: 14, title: 'Печиво' },
                { id: 15, title: 'Сири' },
                { id: 16, title: 'Снеки' },
                { id: 17, title: 'Соки Води' },
                { id: 18, title: 'Солодощі' },
                { id: 19, title: 'Соуси' },
                { id: 20, title: 'Спеції' },
                { id: 21, title: 'Хімія' },
                { id: 22, title: 'Чай Кава' },
            ],
            lists: [],
            recipes: [],
        },
    };

    if (isUserInDataBase.length === 0 && !!access_token) {
        // если пользователя нет в базе данных но есть токен авторизации - создаем нового пользователя
        console.log('Пользователя нет в базе данных');
        try {
            const response = await ky
                .post(`${REQUEST_ADDRESS_MOCAPI}`, {
                    json: productExample,
                })
                .json();
            dispatch(setEditAppData(response));
        } catch (error) {
            alert(error);
        }
    } else if (isUserInDataBase.length === 1 && !!access_token) {
        // если есть пользователь в базе данных и есть токен авторизации - загружаем данные в приложение
        console.log('Пользователь есть в базе данных');
        dispatch(setEditAppData(isUserInDataBase[0]));
        localStorage.setItem('appData', JSON.stringify(isUserInDataBase));
    }
}

function extractImageId(url) {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const id = lastPart.split('.')[0];
    return id;
}

export function isProductSelected(listState, productCard) {
    return listState.productList?.some((item) => item.id === productCard);
}

export async function addListRequest(
    dispatch,
    listState,
    appData,
    setAddtMode
) {
    dispatch(setLoader());
    try {
        const response = await ky
            .put(`${REQUEST_ADDRESS_MOCAPI}${appData.id}`, {
                json: {
                    ...appData,
                    dataBase: {
                        ...appData.dataBase,
                        lists: [...appData.dataBase.lists, listState],
                    },
                },
            })
            .json();
        dispatch(setEditAppData(response));
        dispatch(setLoader());
        setAddtMode();
    } catch (error) {
        dispatch(setLoader());
        alert(error);
    }
}

export async function editListRequest(
    dispatch,
    listState,
    appData,
    handleClickOnEditList
) {
    dispatch(setLoader());
    const newLists = appData.dataBase.lists.map((item) => {
        if (item.id === listState.id) {
            return listState;
        } else {
            return item;
        }
    });

    try {
        const response = await ky
            .put(`${REQUEST_ADDRESS_MOCAPI}${appData.id}`, {
                json: {
                    ...appData,
                    dataBase: {
                        ...appData.dataBase,
                        lists: newLists,
                    },
                },
            })
            .json();
        dispatch(setEditAppData(response));
        dispatch(setLoader());
        handleClickOnEditList();
    } catch (error) {
        dispatch(setLoader());
        alert(error);
    }
}

export async function deleteListRequest(dispatch, id, appData) {
    dispatch(setLoader());
    const newLists = appData.dataBase.lists.filter(
        (filterItem) => filterItem.id !== id
    );

    try {
        const response = await ky
            .put(`${REQUEST_ADDRESS_MOCAPI}${appData.id}`, {
                json: {
                    ...appData,
                    dataBase: {
                        ...appData.dataBase,
                        lists: newLists,
                    },
                },
            })
            .json();
        dispatch(setEditAppData(response));
        dispatch(setLoader());
        window.location.replace('/lists');
    } catch (error) {
        dispatch(setLoader());
        alert(error);
    }
}

export async function addCategoryRequest(
    dispatch,
    appData,
    categoryName,
    setAddtMode
) {
    const categories = appData.dataBase.categories;

    const lasCategoryId = () => {
        if (categories.length) {
            return +categories[categories.length - 1].id + 1;
        } else {
            return 1;
        }
    };

    dispatch(setLoader());

    try {
        const response = await ky
            .put(`${REQUEST_ADDRESS_MOCAPI}${appData.id}`, {
                json: {
                    ...appData,
                    dataBase: {
                        ...appData.dataBase,
                        categories: [
                            ...appData.dataBase.categories,
                            {
                                id: lasCategoryId(),
                                title: categoryName,
                            },
                        ],
                    },
                },
            })
            .json();
        dispatch(setEditAppData(response));
        dispatch(setLoader());
        setAddtMode();
    } catch (error) {
        dispatch(setLoader());
        console.log(error);
    }
}

export async function editCategoryRequest(
    dispatch,
    currentCategory,
    appData,
    setIdCategoryEdit
) {
    dispatch(setLoader());
    const newCategories = appData.dataBase.categories.map((item) => {
        if (item.id == currentCategory.id) {
            return currentCategory;
        } else {
            return item;
        }
    });

    try {
        const response = await ky
            .put(`${REQUEST_ADDRESS_MOCAPI}${appData.id}`, {
                json: {
                    ...appData,
                    dataBase: {
                        ...appData.dataBase,
                        categories: newCategories,
                    },
                },
            })
            .json();
        dispatch(setEditAppData(response));
        dispatch(setLoader());
        setIdCategoryEdit('');
    } catch (error) {
        dispatch(setLoader());
        setIdCategoryEdit('');
        alert(error);
    }
}

export async function deleteCategoryRequest(
    dispatch,
    currentCategory,
    appData,
    setIdCategoryEdit
) {
    dispatch(setLoader());
    const newCategories = appData.dataBase.categories.filter(
        (filterItem) => filterItem.id !== currentCategory.id
    );

    try {
        const response = await ky
            .put(`${REQUEST_ADDRESS_MOCAPI}${appData.id}`, {
                json: {
                    ...appData,
                    dataBase: {
                        ...appData.dataBase,
                        categories: newCategories,
                    },
                },
            })
            .json();
        dispatch(setEditAppData(response));
        dispatch(setLoader());
        setIdCategoryEdit('');
    } catch (error) {
        dispatch(setLoader());
        setIdCategoryEdit('');
        alert(error);
    }
}
