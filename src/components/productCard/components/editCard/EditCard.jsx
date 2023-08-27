import style from './index.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import { addNewProduct, addNewTask, deleteProductRequest } from '../../../../logic/logic';

const EditCard = ({ changeCardStatus, currentProducCard }) => {
    const dispatch = useDispatch();
    const {id, img, cost, title, location, deleteHash, description} = currentProducCard;
    const [stateProduct, setStateProduct] = useState({
        id: id,
        img: img,
        cost: cost,
        title: title,
        location: location,
        deleteHash: deleteHash,
        description: description,
    });
    const [file, setFile] = useState(null);

    const handleFileChange = async (event) => {
        setFile(event.target.files[0]);
    };

    const handleInputChange = (event, field) => {
        setStateProduct({ ...stateProduct, [field]: event.target.value });
    };

    const allValuesFilled = Object.values(stateProduct).every(value => value !== '');

    const handleClickOnDelete = () => {
        deleteProductRequest(deleteHash, id, dispatch);
    }

    const handleClickOnCancel = () => {
        changeCardStatus(prev => !prev)
    }

    const handleClickOnSave = () => {
        if (allValuesFilled && file) {
            addNewProduct(file, stateProduct, dispatch, Resizer);
        } else {
            alert('Не всі поля заповнені');
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.wrapper_productPhoto}>
                <img src={stateProduct.img} alt="product_img" />
            </div>
            <p>Назва</p>
            <input
                type="text"
                value={stateProduct.title}
                onChange={(event) => handleInputChange(event, 'title')}
            />
            <p>Вартість, грн</p>
            <input
                type="number"
                value={stateProduct.cost}
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
                value={stateProduct.description}
                onChange={(event) => handleInputChange(event, 'description')}
            />
            <p>Прікрипити нову фотографію</p>
            <input
                type="file"
                onChange={handleFileChange}
                accept=".jpg, .png, .jpeg, .png"
            />
            <div className={style.buttonGroup}>
                <button className={style.buttonGroup_cancle} onClick={handleClickOnCancel}>Відмінити</button>
                <button className={style.buttonGroup_delete} onClick={handleClickOnDelete}>Видалити</button>
                <button className={style.buttonGroup_save} onClick={handleClickOnSave}>Зберегти</button>
            </div>
        </div>
    );
};

export default EditCard;
