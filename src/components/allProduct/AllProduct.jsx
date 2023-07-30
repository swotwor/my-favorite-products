import style from './index.module.scss';
import ViewCard from './components/productCard/ViewCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserToken } from '../../logic/logic';
import ProductCardHeader from './components/productCardHeader/ProductCardHeader';

const AllProduct = () => {
    const { productItems } = useSelector(state => state.products);

    useEffect(() => {
        getUserToken();
      }, []);

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
