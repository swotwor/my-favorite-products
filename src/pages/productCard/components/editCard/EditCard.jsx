import style from './index.module.scss';
import { useState } from 'react';
import { setCurrentProductCard } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductRequest, editCurrentProduct } from '../../../../logic/logic';

const EditCard = ({ changeCardStatus }) => {
    const dispatch = useDispatch();
    const { currentProductCard, appData } = useSelector(state => state.products);
    const {id, img, cost, title, location, deleteHash, description} = currentProductCard;
    const [stateProduct, setStateProduct] = useState({
        id: id,
        img: img,
        cost: cost,
        title: title,
        location: location,
        deleteHash: deleteHash,
        description: description,
    });

    const handleInputChange = (event, field) => {
        setStateProduct({ ...stateProduct, [field]: event.target.value });
    };

    const handleClickOnDelete = (event) => {
        event.preventDefault();
        deleteProductRequest(currentProductCard, appData, dispatch);
    };

    const handleClickOnCancel = (event) => {
        event.preventDefault();
        changeCardStatus(prev => !prev);
    };
    
    const handleClickOnSave = (event) => {
        event.preventDefault();
        if (stateProduct.title && stateProduct.location) {
            if (
                title !== stateProduct.title
                || cost !== stateProduct.cost
                || location !== stateProduct.location
                || description !== stateProduct.description
            ) {
                editCurrentProduct(stateProduct, dispatch, appData, changeCardStatus);
                dispatch(setCurrentProductCard(stateProduct));
                sessionStorage.setItem('productItem', JSON.stringify(stateProduct));
            } else {
                changeCardStatus(prev => !prev);
            }
        } else {
            alert('Заповніть поля, які позначені *');
        }
    };

    return (
        <div className={style.wrapper}>
            <div className={style.wrapper_productPhoto}>
                <img src={stateProduct.img} alt="product_img" />
            </div>
            <form>
                <label htmlFor='title'>Назва</label>
                <input
                    type="text"
                    name='title'
                    value={stateProduct.title}
                    onChange={(event) => handleInputChange(event, 'title')}
                />
                <label htmlFor='cost'>Вартість, грн</label>
                <input
                    name='cost'
                    type="number"
                    value={stateProduct.cost}
                    onChange={(event) => handleInputChange(event, 'cost')}
                />
                <label htmlFor='description'>Опис товару</label>
                <input
                    name='description'
                    type="text"
                    value={stateProduct.description}
                    onChange={(event) => handleInputChange(event, 'description')}
                />
                <label htmlFor='location'>Де купували</label>
                <input
                    name='locatin'
                    type="text"
                    value={stateProduct.location}
                    onChange={(event) => handleInputChange(event, 'location')}
                />
                {/* <label htmlFor='location'>Оберіть категорію *</label> */}

                <div className={style.buttonGroup}>
                    <button className={style.buttonGroup_cancle} onClick={handleClickOnCancel}>Відмінити</button>
                    <button className={style.buttonGroup_delete} onClick={handleClickOnDelete}>Видалити</button>
                    <button className={style.buttonGroup_save} onClick={handleClickOnSave}>Зберегти</button>
                </div>
            </form>
            
        </div>
    );
};

export default EditCard;
