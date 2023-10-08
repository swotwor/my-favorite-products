import style from './index.module.scss';
import ViewCard from '../../components/productCard/ViewCard';
import { Link } from 'react-router-dom';
import { setCurrentProductCard } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

const AllProduct = () => {
    const dispatch = useDispatch();
    const app = useSelector((state) => state.products.appData.dataBase);
    const isAuth = document.cookie.split(';')[0].split('=')[1];

    const handleClick = (productItem) => {
        dispatch(setCurrentProductCard(productItem));
    };
    
    return (
        <div className={style.allProduct}>
            <div className={style.allProduct_header}>
                Всі продукти
            </div>
            {
                isAuth
                    ? app.productItems.length
                        ? app.productItems.map(productItem => {
                            return (
                                <Link to='/product_card' key={productItem.id} onClick={() => handleClick(productItem)}>
                                    <ViewCard productItem={productItem}/>
                                </Link>
                            );
                        })
                        : <p className={style.allProduct_noProducts}>Ще немає продуктів</p>
                    : <>
                        <p className={style.allProduct_noProducts}>Ви не авторизовані</p>
                        <p className={style.allProduct_noProducts}>(натисніть на шестерню)</p>
                    </>
                    
            }
        </div>
    );
};

export default AllProduct;
