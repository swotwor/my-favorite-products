import style from './index.module.scss';
import ViewCard from '../../components/productCard/ViewCard';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { setCurrentProductCard } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

const AllProduct = () => {
    const dispatch = useDispatch();
    const app = useSelector((state) => state.products.appData.dataBase);

    const handleClick = (productItem) => {
        dispatch(setCurrentProductCard(productItem));
        sessionStorage.setItem('productItem', JSON.stringify(productItem));
    }

    useEffect(() => {
        sessionStorage.removeItem('productItem');
    }, []);
    
    return (
        <div className={style.allProduct}>
            <div className={style.allProduct_header}>
                Всі продукти
            </div>
            {
                app.productItems.length
                ? app.productItems.map(productItem => {
                    return (
                        <Link to='/product_card' key={productItem.id} onClick={() => handleClick(productItem)}>
                            <ViewCard productItem={productItem}/>
                        </Link>
                    );
                })
                : <p className={style.allProduct_noProducts}>Ще немає продуктів</p>
            
            }
        </div>
    );
};

export default AllProduct;
