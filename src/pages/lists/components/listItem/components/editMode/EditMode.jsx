import style from './index.module.scss';
import { useEffect, useState } from 'react';
import EditModeCard from './components/editModeCard/EditModeCard';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListRequest, editListRequest, isProductSelected } from '../../../../../../logic/logic';

const EditMode = ({ handleClickOnEditList, listItem }) => {
    const dispatch = useDispatch();
    const { appData } = useSelector(state => state.products);
    const productItems = appData.dataBase.productItems;
    const [temporaryListState, setTemporaryListState] = useState({...listItem});
    const newArray = [...temporaryListState.productList];
    
    // const combineProducts = () => {

    //     productItems.map(item1 => {
    //         temporaryListState.productList.map(item2 => {
    //             if (item1.id !== item2.id) {
    //                 newArray.push(item1)
    //             }
    //         })
    //     })

    //     return newArray;
    // }

    useEffect(() => {
        productItems.map(item1 => {
            temporaryListState.productList.map(item2 => {
                if (item1.id !== item2.id) {
                    newArray.push(item1)
                }
            })
        })
        console.log(newArray);
    }, [temporaryListState])

    const handleChangeInput = event => {
        setTemporaryListState({...temporaryListState, title: event.target.value})
    };
    
    const handleClickOnCard = (isInputChange, productItem) => {
        const isProductExist =  temporaryListState.productList?.some(item => item.id === productItem.id);
        const editAmountProduct = temporaryListState.productList.map(item => {
            if (item.id === productItem.id) {
                return {...item, amount: productItem.amount}
            } else {
                return item
            }
        });



        if (isInputChange) {
            setTemporaryListState({
                ...temporaryListState,
                productList: [
                    ...editAmountProduct
                ]
            })
        } else {
            if (!isProductExist) {
                console.log('продукта нет есть в списке - добавляем');
                console.log(productItem);
                setTemporaryListState({ 
                    ...temporaryListState,
                    productList: [
                        ...temporaryListState.productList,
                        productItem,
                    ]
                })
                console.log(temporaryListState);
            } else {
                console.log('продукт есть в списке - убираем');
                setTemporaryListState({
                    ...temporaryListState,
                    productList: [
                        ...temporaryListState.productList.filter(item => item.id !== productItem.id)
                    ]
                })
            }
        }
        
    };

    const handleClickOnCancelButton = () => {
        handleClickOnEditList();
    };
    const handleClickOnDeleteButton = () => {
        deleteListRequest(dispatch, temporaryListState.id, appData);
    };
    const handleClickOnSaveButton = () => {
        editListRequest(dispatch, temporaryListState, appData, handleClickOnEditList);
    };

    return (
        <div className={style.editModeWrapper}>
            <input type="text" placeholder='Назва списку' onChange={handleChangeInput} value={temporaryListState.title}/>
            {
                newArray.map(item =>
                    <EditModeCard
                        key={item.id}
                        item={item}
                        listState={temporaryListState}
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