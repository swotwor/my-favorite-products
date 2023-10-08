import style from './index.module.scss';
import { useSelector } from 'react-redux';
import { countInCategories } from './../../../../../../helpers/countInCategories';

const Category = () => {
    const { productItems ,categories } = useSelector(state => state.products.appData.dataBase);
    
    return (
        <div className={style.categoryWrapper}>
            {
                categories.map((category) => {
                    return (
                        <div className={style.categoryWrapper_item} key={category}>
                            {category + ' ' + '(' + countInCategories(productItems, category) + ')'}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Category;
