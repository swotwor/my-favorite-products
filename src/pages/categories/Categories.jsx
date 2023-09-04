import style from './index.module.scss';
import { useSelector } from 'react-redux';

const Categories = () => {
    const {productItems, categories} = useSelector(state => state.products.appData.dataBase);
    console.log(productItems, categories);

    return (
        <div className={style.categoriesWrapper}>
            <button className={style.categoriesWrapper_button}>Додати категорію</button>
            
        </div>
    );
};

export default Categories;