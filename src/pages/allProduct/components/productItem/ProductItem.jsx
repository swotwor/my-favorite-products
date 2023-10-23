import style from './index.module.scss';
import { Link } from 'react-router-dom';
import ViewCard from '../../../../components/productCard/ViewCard';
import { useDispatch } from 'react-redux';
import { setCurrentProductCard } from '../../../../store/store';
import { countInCategories } from '../../../../helpers/helper';

const ProductItem = ({ item, products, openCategory, setOpenCategory }) => {
    const dispatch = useDispatch();

    const handleClick = (productItem) => {
        dispatch(setCurrentProductCard(productItem));
        sessionStorage.setItem('productItem', JSON.stringify(productItem));
    }

    const handleClickOpenSpoyler = (id) => {
        if (openCategory == id) {
            setOpenCategory('');
        } else {
            setOpenCategory(id);
        }
    }

    if (!countInCategories(products, item.id)) {
        return false
    }

    return (
        <div className={style.productItem}>
            <p onClick={() => handleClickOpenSpoyler(item.id)} className={style.productItem_title} >
                {item.title} {countInCategories(products, item.id)}
            </p>
            {
                openCategory == item.id
                    ? products.map(productItem => {
                            if (productItem.category == item.id) {
                                    return <div className={style.productItem_box} key={productItem.category}>
                                        <Link
                                            to="/product_card"
                                            key={productItem.id}
                                            onClick={() => handleClick(productItem)}
                                        >
                                            <ViewCard productItem={productItem} />
                                        </Link>
                                    </div>
                        }
                      })
                    : null
                    }
        </div>
    );
};

export default ProductItem;
