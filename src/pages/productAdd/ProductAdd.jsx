import style from './index.module.scss';
import Resizer from 'react-image-file-resizer';
import { useState } from 'react';
import { addNewProduct } from '../../logic/logic';
import { useDispatch, useSelector } from 'react-redux';

const ProductAdd = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.products.appData);
    const [stateProduct, setStateProduct] = useState({
        cost: '',
        title: '',
        amount: '',
        bought: '',
        location: '',
        description: '',
    });
    const [file, setFile] = useState(null);

    const handleFileChange = async (event) => {
        setFile(event.target.files[0]);
    };

    const handleInputChange = (event, field) => {
        setStateProduct({ ...stateProduct, [field]: event.target.value });
    };

    const handleClickOnButton = () => {
        if (stateProduct.title && file && stateProduct.location) {
            addNewProduct(file, stateProduct, dispatch, Resizer, userData);
        } else {
            alert('Заповніть поля, які позначені *');
        }
    };

    return (
        <div className={style.wrapper}>
            <div className={style.productCardHeader}>
                Додати
            </div>
            <p>Назва*</p>
            <input
                type="text"
                maxLength={50}
                value={stateProduct.title}
                onChange={(event) => handleInputChange(event, 'title')}
            />
            <p>Вартість, грн</p>
            <input
                type="number"
                value={stateProduct.cost}
                onChange={(event) => handleInputChange(event, 'cost')}
            />
            <p>Опис товару</p>
            <input
                type="text"
                value={stateProduct.description}
                onChange={(event) => handleInputChange(event, 'description')}
            />
            <p htmlFor='location'>Оберіть категорію *</p>
            <select className={style.select} onChange={(event) => handleInputChange(event, 'category')}>
                {
                    userData.dataBase.categories.map((category) => 
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.title}
                        </option>
                    )
                }
            </select>
            <p>Де купували*</p>
            <input
                type="text"
                value={stateProduct.location}
                onChange={(event) => handleInputChange(event, 'location')}
            />
            <p>Прікрипити фотографію*</p>
            <input
                type="file"
                onChange={handleFileChange}
                accept=".jpg, .png, .jpeg, .png"
            />
            <button onClick={handleClickOnButton}>Додати</button>
        </div>
    );
};

export default ProductAdd;
