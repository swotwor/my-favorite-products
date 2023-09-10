import style from './index.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addListRequest, isProductSelected } from '../../../../logic/logic';
import AddListCard from '../../../../components/addListCard/AddListCard';

const AddList = ({ setAddtMode }) => {
    const idList = Date.now();
    const dispatch = useDispatch();
    const { appData } = useSelector(state => state.products);
    const { productItems } = appData.dataBase;
    const [listState, setListState] = useState({
        id: idList,
        title: '',
        productList: [],
    });

    const handleChangeInput = event => {
        setListState({
            ...listState,
            title: event.target.value,
        });
    };
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

    const handleClickOnSaveButton = () => {
        addListRequest(dispatch, listState, appData, setAddtMode);
    };
    const handleClickOnCancelButton = () => {
        setAddtMode(false);
    };

    return (
        <div className={style.addListWrapper}>
            <input
                type="text"
                value={listState.title}
                onChange={handleChangeInput}
                placeholder="Назва списку"
            />
            {productItems.map(item => (
                <div
                    key={item.id}
                    style={{
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
            <div className={style.addListWrapper_buttonBlock}>
                <button
                    onClick={handleClickOnCancelButton}
                    className={style.addListWrapper_cancelButton}
                >
                    Відмінити
                </button>
                <button
                    onClick={handleClickOnSaveButton}
                    className={style.addListWrapper_saveButton}
                >
                    Додати
                </button>
            </div>
        </div>
    );
};

export default AddList;
