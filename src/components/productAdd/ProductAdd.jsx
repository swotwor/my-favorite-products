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

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };

    const handleInputChange = (event, field) => {
        setStateProduct({ ...stateProduct, [field]: event.target.value });
    };
    
    const allValuesFilled = Object.values(stateProduct).every(value => value !== '');
    
    const handleClickOnButton = () => {
        const formData = new FormData();
        formData.append('data-binary', file);
        uploadFile(formData, file.name);
        // if(allValuesFilled) {
        //     addNewProduct(stateProduct);
        //     setStateProduct({
        //         cost: '',
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
            <p>Прікрипити фотографію</p>
            <input type="file" onChange={handleFileChange} accept='.jpg, .png, .jpeg, .png' />
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
            <button onClick={handleClickOnButton}>Додати</button>
        </div>
    );
};

export default ProductAdd;
