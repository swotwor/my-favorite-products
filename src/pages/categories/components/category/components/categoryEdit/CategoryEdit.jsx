import style from './index.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryRequest, editCategoryRequest } from '../../../../../../logic/logic';

const CategoryEdit = ({ category, setIdCategoryEdit }) => {
    const dispatch = useDispatch();
    const {id, title} = category;
    const [currentCategory, setCurrentCategory] = useState({id, title});
    const {appData} = useSelector(state => state.products);

    const handleChangeTitle = (event) => {
        setCurrentCategory({...currentCategory, title: event.target.value});
    };
    const handleClickOnButton = (event) => {
        const clickedButton = event.target;

        if (clickedButton.classList.contains(style.categoryEdit_cancelButton)) {
            setIdCategoryEdit('');
        } else if (clickedButton.classList.contains(style.categoryEdit_saveButton)) {
            editCategoryRequest(dispatch, currentCategory, appData, setIdCategoryEdit);
        } else if (clickedButton.classList.contains(style.categoryEdit_deleteButton)) {
            deleteCategoryRequest(dispatch, currentCategory, appData, setIdCategoryEdit);
        }
    };

    return (
        <div className={style.categoryEdit}>
            <input
                type="text"
                value={currentCategory.title}
                onChange={handleChangeTitle}
                maxLength={30}
                className={style.categoryEdit_input}
            />
            <div className={style.categoryEdit_buttonBlock} onClick={handleClickOnButton}>
                <button className={style.categoryEdit_cancelButton}>Відмінити</button>
                <button className={style.categoryEdit_saveButton}>Зберегти</button>
                <button className={style.categoryEdit_deleteButton}>Видалити</button>
            </div>
        </div>
    );
};

export default CategoryEdit;