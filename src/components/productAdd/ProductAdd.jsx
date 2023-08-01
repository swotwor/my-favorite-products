import style from './index.module.scss';
import { useState } from 'react';
import ProductAddHeader from './components/productAddHeader/ProductAddHeader';
import { addNewProduct, getCurrentAccount, getUserInfo, uploadFile } from '../../logic/logic';

const ProductAdd = () => {
    const [stateProduct, setStateProduct] = useState({
        img: '',
        cost: '',
        title: '',
        location: '',
        description: '',
    });
    const [file, setFile] = useState(null);

    const handleInputChange = (event, field) => {
        setStateProduct({ ...stateProduct, [field]: event.target.value });
    };
    
    const allValuesFilled = Object.values(stateProduct).every(value => value !== '');
    
    const handleClickOnButton = () => {
        // if(allValuesFilled) {
        //     addNewProduct(stateProduct);
        //     setStateProduct({
        //         img: '',
        //         cost: '',
        //         title: '',
        //         location: '',
        //         description: '',
        //     })
        // } else {
        //     alert('Не всі поля заповнені')
        // }

        const formData = new FormData();
        formData.append('file', file);
        uploadFile(formData);
        // getCurrentAccount();
        // getUserInfo()
        // const cookies = document.cookie.split(';')[0].split('=')[1];
        // console.log(cookies)

    };

    return (
        <div className={style.wrapper}>
            <ProductAddHeader />
            <p>Посилання на фото</p>
            <input
                type="text"
                value={stateProduct.img}
                onChange={event => handleInputChange(event, 'img')}
            />
            <p>Назва</p>
            <input
                type="text"
                value={stateProduct.title}
                onChange={event => handleInputChange(event, 'title')}
            />
            <p>Вартість</p>
            <input
                type="text"
                value={stateProduct.cost}
                onChange={event => handleInputChange(event, 'cost')}
            />
            <p>Де купували</p>
            <input
                type="text"
                value={stateProduct.location}
                onChange={event => handleInputChange(event, 'location')}
            />
            <p>Опис товару</p>
            <input
                type="text"
                value={stateProduct.description}
                onChange={event => handleInputChange(event, 'description')}
            />
            <input type="file" id="fileInput" name="file" accept=".jpg, .jpeg, .png" />
            <button onClick={handleClickOnButton}>Додати</button>
        </div>
    );
};

export default ProductAdd;
