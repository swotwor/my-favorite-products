import style from './index.module.scss';
import ViewCard from './components/productCard/ViewCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AllProduct = () => {
    const { productItems } = useSelector((state) => state.products.appData.dataBase);
    
    return (
        <div className={style.allProduct}>
            <div className={style.productCardHeader}>
                Всі продукти
            </div>
            {productItems.map((productItem) => {
                return (
                    <Link to='/product_card' key={productItem.id}>
                        <ViewCard productItem={productItem}/>
                    </Link>
                );
            })}
        </div>
    );
};

export default AllProduct;
