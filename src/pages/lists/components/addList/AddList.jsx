import style from './index.module.scss';
import ViewCard from '../../../../components/productCard/ViewCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AddList = () => {
    const [listState, setListState] = useState({title: '', productList: []});
    const allProducts = useSelector(state => state.products.appData.dataBase.productItems);

    const handleChangeInput = (event) => {
        setListState({
            ...listState,
            title: event.target.value,
        })
    };
    const handleClickOnCard = (productItem) => {
        const isProductExist =  listState.productList?.some(item => item.id === productItem.id)

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
    return (
        <div className={style.addListWrapper}>
            <input type="text" placeholder='Назва списку' onChange={handleChangeInput} value={listState.title}/>
            {
                allProducts.map(item =>
                    <div key={item.id} onClick={() => handleClickOnCard(item)}>
                        <ViewCard
                            productItem={item}
                        />
                    </div>
                )
            }
        </div>
    );
};

export default AddList;