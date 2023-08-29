import style from './index.module.scss';
import ViewCard from './components/productCard/ViewCard';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentProductCard } from '../../store/store';
import { useEffect } from 'react';

const AllProduct = () => {
    const dispatch = useDispatch();
    const app = useSelector((state) => state.products.appData.dataBase);

    const handleClick = (productItem) => {
        dispatch(setCurrentProductCard(productItem));
        sessionStorage.setItem('productItem', JSON.stringify(productItem));
    }

    useEffect(() => {
        sessionStorage.removeItem('productItem');
    }, [])
    
    return (
        <div className={style.allProduct}>
            <div className={style.productCardHeader}>
                Всі продукти
            </div>
            {app.productItems.map(productItem => {
                return (
                    <Link to='/product_card' key={productItem.id} onClick={() => handleClick(productItem)}>
                        <ViewCard productItem={productItem}/>
                    </Link>
                );
            })}
        </div>
    );
};

export default AllProduct;
