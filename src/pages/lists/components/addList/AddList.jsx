import style from './index.module.scss';
import ViewCard from '../../../../components/productCard/ViewCard';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addListRequest, isProductSelected } from '../../../../logic/logic';

const AddList = ({ setEditMode }) => {
    const dispatch = useDispatch();
    const [listState, setListState] = useState({title: '', productList: []});
    const { appData } = useSelector(state => state.products);
    const { productItems } = appData.dataBase;

    const handleChangeInput = (event) => {
        setListState({
            ...listState,
            title: event.target.value,
        })
    };
    const handleClickOnCard = (productItem) => {
        const isProductExist =  listState.productList?.some(item => item.id === productItem.id);

        if (!isProductExist) {
            setListState({ 
                ...listState,
                productList: [
                    ...listState.productList,
                    productItem,
                ]
            })
        } else {
            setListState({
                ...listState,
                productList: [
                    ...listState.productList.filter(item => item.id !== productItem.id)
                ]
            })
        }
    };

    const handleClickOnSaveButton = () => {
        addListRequest(dispatch, listState, appData, setEditMode);
    };
    const handleClickOnCancelButton = () => {
        setEditMode(false);
    };
    
    return (
        <div className={style.addListWrapper}>
            <input type="text" placeholder='Назва списку' onChange={handleChangeInput} value={listState.title}/>
            {
                productItems.map(item =>
                    <div
                        key={item.id}
                        className={style.addListWrapper_card}
                        onClick={() => handleClickOnCard(item)}
                        style={{backgroundColor: isProductSelected(listState, item.id) ? 'rgba(0, 130, 0, 0.8)' : null}}
                    >
                        <ViewCard
                            productItem={item}
                        />
                    </div>
                )
            }
            <div className={style.addListWrapper_buttonBlock}>
                <button
                    className={style.addListWrapper_cancelButton}
                    onClick={handleClickOnCancelButton}>
                        Відмінити
                </button>
                <button
                    className={style.addListWrapper_saveButton}
                    onClick={handleClickOnSaveButton}>
                        Додати
                </button>
            </div>
        </div>
    );
};

export default AddList;