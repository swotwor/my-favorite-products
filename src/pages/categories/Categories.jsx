import style from './index.module.scss';
import Category from './components/categoryItem/components/category/Category';
import AddCategory from './components/addCategory/AddCategory';
import { useState } from 'react';

const Categories = () => {
    const [addMode, setAddtMode] = useState(false);
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
                    : <Category />
            }
        </div>
    );
};

export default Categories;