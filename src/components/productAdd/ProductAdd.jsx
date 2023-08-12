import style from './index.module.scss';
import { useState } from 'react';
import ProductAddHeader from './components/productAddHeader/ProductAddHeader';
import { addNewProduct, getCurrentAccount, getUserInfo, uploadFile, uploadFileImg } from '../../logic/logic';

const ProductAdd = () => {
    const [stateProduct, setStateProduct] = useState({
        img: 'https://www.dropbox.com/s/uorf93ye2syxp9q/photo.jpg?dl=0',
        cost: '',
        title: '',
        location: '',
        description: '',
    });
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };

    const handleInputChange = (event, field) => {
        setStateProduct({ ...stateProduct, [field]: event.target.value });
    };
    
    const allValuesFilled = Object.values(stateProduct).every(value => value !== '');
    
    const handleClickOnButton = () => {
        // const formData = new FormData();
        // formData.append('data-binary', file);
        // uploadFile(formData, file.name);

        const formData = new FormData();
        formData.append('image', file);
        uploadFileImg(formData);

        // if(allValuesFilled) {
        //     addNewProduct(stateProduct);
        //     setStateProduct({
        //         cost: '',
        //         img: 'https://www.dropbox.com/s/uorf93ye2syxp9q/photo.jpg?dl=0',
        //         title: '',
        //         location: '',
        //         description: '',
        //     })
        // } else {
        //     alert('Не всі поля заповнені')
        // }
    };

    return (
        <div className={style.wrapper}>
            <ProductAddHeader />
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
            <p>Прікрипити фотографію</p>
            <input type="file" onChange={handleFileChange} accept='.jpg, .png, .jpeg, .png' />
            <button onClick={handleClickOnButton}>Додати</button>
        </div>
    );
};

export default ProductAdd;
