import style from './index.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AddCategory from './components/addCategory/AddCategory';

const Categories = () => {
    const [addMode, setAddtMode] = useState(false);
    // const {productItems, categories} = useSelector(state => state.products.appData.dataBase);
    // console.log(productItems, categories);
    const handleClickOnButton = () => {
        setAddtMode(true);
    }

    return (
        <div className={style.categoriesWrapper}>
            <button
                onClick={handleClickOnButton}
                className={style.categoriesWrapper_button}>
                    Додати категорію
            </button>
            {
                addMode
                    ? <AddCategory setAddtMode={setAddtMode}/>
                    : null
            }
        </div>
    );
};

export default Categories;