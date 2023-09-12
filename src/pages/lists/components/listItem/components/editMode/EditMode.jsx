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
        const combineProduct = () => {
            return [
                ...productList,
                productItems.filter((item1) => !productList.some((item2) => item1.id === item2.id))
            ]
        };

        // console.log(combineProduct());
        // console.log(productItems.filter((item1) => productList.some((item2) => item1.id !== item2.id)));
        console.log(productList.some(item2 => item2.id === "SHDhfJ"));
        console.log(productList);

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
        console.log(listState);
        editListRequest(dispatch, listState, appData, handleClickOnEditList);
    };

    return (
        <div className={style.editModeWrapper}>
            <input type="text" placeholder='Назва списку' onChange={handleChangeInput} value={listState.title}/>
            {
                productList.map(item =>
                    <EditModeCard
                        key={item.id}
                        item={item}
                        listState={listState}
                        handleClickOnCard={handleClickOnCard}
                    />
                )
            }
            <div className={style.editModeWrapper_buttonBlock}>
                <button
                    onClick={handleClickOnCancelButton}
                    className={style.editModeWrapper_cancelButton}>
                        Відмінити
                </button>
                <button
                    onClick={handleClickOnDeleteButton}
                    className={style.editModeWrapper_deleteButton}>
                        Видалити
                </button>
                <button
                    onClick={handleClickOnSaveButton}
                    className={style.editModeWrapper_saveButton}>
                        Зберегти
                </button>
            </div>
        </div>
    );
};

export default EditMode;