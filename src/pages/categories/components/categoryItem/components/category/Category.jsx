import style from './index.module.scss';
import { useSelector } from 'react-redux';

const Category = () => {
    const { categories } = useSelector(state => state.products.appData.dataBase);
    
    return (
        <div className={style.categoryWrapper}>
            {
                categories.map((category) => {
                    return (
                        <div className={style.categoryWrapper_item} key={category}>
                            {category}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Category;
