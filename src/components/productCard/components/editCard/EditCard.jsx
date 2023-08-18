import style from './index.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import { deleteProductRequest } from '../../../../logic/logic';

const EditCard = () => {
    const dispatch = useDispatch();
    const [stateProduct, setStateProduct] = useState(JSON.parse(sessionStorage.getItem('productItem')));
    const {id, cost, deleteHash, description, img, location, title} = stateProduct;
    // const [file, setFile] = useState(null);

    // const handleFileChange = async (event) => {
    //     setFile(event.target.files[0]);
    // };

    const handleInputChange = (event, field) => {
        setStateProduct({ ...stateProduct, [field]: event.target.value });
    };

    const allValuesFilled = Object.values(stateProduct).every(value => value !== '');

    const handleClickOnButton = () => {
        // if (allValuesFilled && file) {
        //     addNewProduct(file, stateProduct, duspatch, Resizer);
        // } else {
        //     alert('Не всі поля заповнені');
        // }
    };

    const handleClickOnDelete = () => {
        deleteProductRequest(deleteHash, id, dispatch);
    }

    const handleClickOnCancel = () => {

    }

    const handleClickOnSave = () => {

    }

    return (
        <div className={style.wrapper}>
            <div className={style.wrapper_productPhoto}>
                <img src={img} alt="product_img" />
            </div>
            <p>Назва</p>
            <input
                type="text"
                value={title}
                onChange={(event) => handleInputChange(event, 'title')}
            />
            <p>Вартість, грн</p>
            <input
                type="number"
                value={cost}
                onChange={(event) => handleInputChange(event, 'cost')}
            />
            <p>Де купували</p>
            <input
                type="text"
                value={location}
                onChange={(event) => handleInputChange(event, 'location')}
            />
            <p>Опис товару</p>
            <input
                type="text"
                value={description}
                onChange={(event) => handleInputChange(event, 'description')}
            />
            {/* <p>Прікрипити нову фотографію</p>
            <input
                type="file"
                onChange={handleFileChange}
                accept=".jpg, .png, .jpeg, .png"
            /> */}
            <div className={style.buttonGroup}>
                <button onClick={handleClickOnCancel}>Відмінити</button>
                <button onClick={handleClickOnDelete}>Видалити</button>
                <button onClick={handleClickOnSave}>Зберегти</button>
            </div>
        </div>
    );
};

export default EditCard;
