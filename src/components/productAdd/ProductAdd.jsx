import style from './index.module.scss';
import { useState } from 'react';
import ProductAddHeader from './components/productAddHeader/ProductAddHeader';
import { addNewProduct } from '../../logic/logic';
import { useDispatch } from 'react-redux';

const ProductAdd = () => {
    const duspatch = useDispatch();
    const [stateProduct, setStateProduct] = useState({
        cost: '',
        title: '',
        location: '',
        description: '',
    });
    const [file, setFile] = useState();
    
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    
    const handleInputChange = (event, field) => {
        setStateProduct({ ...stateProduct, [field]: event.target.value });
    };
    
    const allValuesFilled = Object.values(stateProduct).every(value => value !== '');
    
    const handleClickOnButton = () => {
        addNewProduct(file, stateProduct, duspatch);

        if(allValuesFilled && file) {
            setStateProduct({
                cost: '',
                title: '',
                location: '',
                description: '',
            })
        } else {
            alert('Не всі поля заповнені')
        }
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
            <p>Вартість, грн</p>
            <input
                type="number"
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
            <input type="file" onChange={handleFileChange} accept='.jpg, .png, .jpeg, .png'/>
            <button onClick={handleClickOnButton}>Додати</button>
        </div>
    );
};

export default ProductAdd;
