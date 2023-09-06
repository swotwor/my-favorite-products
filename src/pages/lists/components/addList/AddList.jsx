import style from './index.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addListRequest, isProductSelected } from '../../../../logic/logic';
import AddListCard from '../../../../components/addListCard/AddListCard';

const AddList = ({ setAddtMode }) => {
    const idList =  Date.now();
    const dispatch = useDispatch();
    const { appData } = useSelector(state => state.products);
    const { productItems } = appData.dataBase;
    const [listState, setListState] = useState({
        id: idList,
        title: '',
        productList: [],
    });

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
        addListRequest(dispatch, listState, appData, setAddtMode);
    };
    const handleClickOnCancelButton = () => {
        setAddtMode(false);
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
                        <AddListCard item={item}/>
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