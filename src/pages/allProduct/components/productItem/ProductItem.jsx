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

    return (
        <div className={style.productItem}>
            <p
                className={style.productItem_title}
                onClick={() => handleClickOpenSpoyler(item.id)}
            >
                {item.title} {countInCategories(products, item.id)}
            </p>
            {
                products.map(productItem => {
                    return <Link
                        to="/product_card"
                        key={productItem.id}
                        onClick={() => handleClick(productItem)}
                    >
                        <ViewCard productItem={productItem} />
                    </Link>
                })


                    // ? products.map(productItem => {
                        //     if (productItem.category == item.id) {
                            //         return (
                                //             <div className={style.productItem_box} key={productItem.category}>
                    //                 <Link
                    //                     to="/product_card"
                    //                     key={productItem.id}
                    //                     onClick={() => handleClick(productItem)}
                    //                 >
                    //                     <ViewCard productItem={productItem} />
                    //                 </Link>
                    //             </div>
                    //         )
                    //     }
                    //   })
                    // : null
                    }
        </div>
    );
};

export default ProductItem;
