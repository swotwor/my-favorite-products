import ky from 'ky';
import { setAppData, setProductItem } from '../store/store';

export async function addNewProduct(file, productInfo, duspatch, Resizer) {
    const fileBeforCompression = await compressImage(file, Resizer)
    const imageInfo = await uploadImage(fileBeforCompression);
    
    const response = await ky
    .post('https://61ed9b4c634f2f00170cec9d.mockapi.io/products', {
        json: {...productInfo, img: imageInfo.link, deleteHash: imageInfo.deletehash},
    })
    .json();
    duspatch(setProductItem(response));
    window.location.replace('/');
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
    const access_token = document.cookie.split(';')[0].split('=')[1];
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

export async function getAppData(dispatch) {
    const response = await ky
    .get('https://61ed9b4c634f2f00170cec9d.mockapi.io/products')
    .json();
    dispatch(setAppData(response));
    localStorage.setItem('myFavProd_appData', JSON.stringify(response))
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
    
    if(!document.cookie.split(';')[0].split('=')[1]) {
        console.log("have cockie");
        document.cookie = `access_token=${result.access_token}`;
        localStorage.setItem('myFavProd_userName', JSON.stringify(result.account_username));
        window.location.replace('/');
    }

}

export async function deleteFoto(imageHash) {
    const access_token = document.cookie.split(';')[0].split('=')[1];

    try {
        const response = await ky
        .delete(`https://api.imgur.com/3/image/${imageHash}`, {
            headers: {
                authorization: `Bearer ${access_token}`,
            },
        })
        .json();
        console.log(response)
        
        // response
        // data:true
        // status:200
        // success:true
    } catch (error) {
        alert(error)
    }
    
}