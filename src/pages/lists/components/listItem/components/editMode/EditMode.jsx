import style from './index.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListRequest, editListRequest, isProductSelected } from '../../../../../../logic/logic';
import EditModeCard from './components/editModeCard/EditModeCard';

const EditMode = ({ handleClickOnEditList, listItem }) => {
    const dispatch = useDispatch();
    const { appData } = useSelector(state => state.products);
    const { productItems } = appData.dataBase;
    const { id, title, productList } = listItem;
    const [listState, setListState] = useState({id, title, productList: [...productList]});

    const handleChangeInput = event => {
        setListState({...listState, title: event.target.value})
    };
    const handleClickOnCard = productItem => {
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

    const handleClickOnCancelButton = () => {
        handleClickOnEditList();
    };
    const handleClickOnDeleteButton = () => {
        deleteListRequest(dispatch, id, appData);
    };
    const handleClickOnSaveButton = () => {
        editListRequest(dispatch, listState, appData, handleClickOnEditList);
    };

    return (
        <div className={style.editModeWrapper}>
            <input type="text" placeholder='Назва списку' onChange={handleChangeInput} value={listState.title}/>
            {
                productItems.map(item => <EditModeCard key={item.id} item={item} handleClickOnCard={handleClickOnCard}/>)
            }
            <div className={style.editModeWrapper_buttonBlock}>
                <button
                    className={style.editModeWrapper_cancelButton}
                    onClick={handleClickOnCancelButton}>
                        Відмінити
                </button>
                <button
                    className={style.editModeWrapper_deleteButton}
                    onClick={handleClickOnDeleteButton}>
                        Видалити
                </button>
                <button
                    className={style.editModeWrapper_saveButton}
                    onClick={handleClickOnSaveButton}>
                        Зберегти
                </button>
            </div>
        </div>
    );
};

export default EditMode;