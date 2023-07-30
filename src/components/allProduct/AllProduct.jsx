import style from './index.module.scss';
import ViewCard from './components/productCard/ViewCard';
import { useSelector } from 'react-redux';
import ProductCardHeader from './components/productCardHeader/ProductCardHeader';

const AllProduct = () => {
    const { productItems } = useSelector(state => state.products);

    return (
        <div className={style.allProduct}>
            <ProductCardHeader />
            {productItems.map(productItem => {
                return <ViewCard key={productItem.id} productItem={ productItem }/>
            })}
        </div>
    );
};

export default AllProduct;
