import style from './index.module.scss';
import CategoryView from './components/categoryView/CategoryView';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CategoryEdit from './components/categoryEdit/CategoryEdit';
import { sortByTitle } from '../../../../helpers/helper';

const Category = () => {
    const { categories } = useSelector(state => state.products.appData.dataBase);
    const [idCategoryEdit, setIdCategoryEdit] = useState('');
    const sortCategories = sortByTitle(categories);
    console.log(sortCategories);

    return (
        sortCategories.length
        ? <div className={style.categoryWrapper}>
            {
                sortCategories.map((category) =>
                    idCategoryEdit == category.id
                        ? <CategoryEdit
                            key={category.id}
                            category={category}
                            setIdCategoryEdit={setIdCategoryEdit}
                        />
                        : <CategoryView
                            key={category.id}
                            category={category}
                            setIdCategoryEdit={setIdCategoryEdit}
                        />
                )
            }
            </div>
        : null
    );
};

export default Category;
