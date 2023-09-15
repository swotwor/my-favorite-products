import style from './index.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListRequest, editListRequest, isProductSelected } from '../../../../../../logic/logic';
import AddListCard from '../../../../../../components/addListCard/AddListCard';

const EditMode = ({ handleClickOnEditList, listItem }) => {
    const dispatch = useDispatch();
    const { appData } = useSelector(state => state.products);
    const productItems = appData.dataBase.productItems;
    const [listState, setListState] = useState({
        id: listItem.id,
        title: listItem.title,
        productList: [...listItem.productList],
    });
    const combineProducts = [...productItems];

    const handleChangeInput = event => {
        setListState({
            ...listState,
            title: event.target.value,
        });
    };

    useEffect(() => {
        listState.productList.forEach((item1) => {
            if (!productItems.some((item2) => item1.id === item2.id)) {
                combineProducts.push(item1);
            }
        });
    }, [listState])
    
    const handleClickOnCard = (isClick, productItem) => {
        const isProductExist = listState.productList?.some(
            item => item.id === productItem.id
        );

        if (isClick) {
            if (!isProductExist) {
                setListState({
                    ...listState,
                    productList: [...listState.productList, productItem],
                });
            } else {
                setListState({
                    ...listState,
                    productList: [
                        ...listState.productList.filter(
                            item => item.id !== productItem.id
                        ),
                    ],
                });
            }
        } else {
            if (!isProductExist) {
                setListState({
                    ...listState,
                    productList: [...listState.productList, productItem],
                });
            } else {
                setListState({
                    ...listState,
                    productList: listState.productList.map(item => {
                    if (item.id === productItem.id) {
                        return productItem
                    } else {
                        return item
                    }
                }),
                });
                
            }            
        }
    };

    const handleClickOnCancelButton = () => {
        handleClickOnEditList();
    };
    const handleClickOnDeleteButton = () => {
        deleteListRequest(dispatch, listState.id, appData);
    };
    const handleClickOnSaveButton = () => {
        editListRequest(dispatch, listState, appData, handleClickOnEditList);
    };

    return (
        <div className={style.editModeWrapper}>
            <input
                type="text"
                placeholder='Назва списку'
                value={listState.title}
                onChange={handleChangeInput}
            />
            {combineProducts.map(item => (
                <div
                    key={item.id}
                    style={{
                        borderRadius: '10px',
                        backgroundColor: isProductSelected(listState, item.id)
                            ? 'rgba(0, 130, 0, 0.8)'
                            : null,
                    }}
                    className={style.addListWrapper_card}
                >
                    <AddListCard
                        item={item}
                        handleClickOnCard={handleClickOnCard}
                    />
                </div>
            ))}
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