import style from './index.module.scss';
import { useState } from 'react';
import { addCategoryRequest } from '../../../../logic/logic';
import { useDispatch, useSelector } from 'react-redux';

const AddCategory = ({ setAddtMode }) => {
    const [categoryName, setCategoryName] = useState('');
    const state = useSelector(state => state.products);
    const dispatch = useDispatch();

    const handleClickOnSave = () => {
        if (categoryName.trim) {
            addCategoryRequest(dispatch, state.appData, categoryName, setAddtMode)
        }

    };
    const handleClickOnCancel = () => {
        setAddtMode(false);
    };

    return (
        <div className={style.addCategoryWrapper}>
            <input
                type="text"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                className={style.addCategoryWrapper}
                placeholder="Введіть назву категорії"
            />
            <div className={style.addCategoryWrapper_buttonBlock}>
                <button
                    onClick={handleClickOnCancel}
                    className={style.addCategoryWrapper_cancelButton}>
                        Відмінити
                </button>
                <button
                    onClick={handleClickOnSave}
                    className={style.addCategoryWrapper_saveButton}>
                        Додати
                </button>
            </div>
        </div>
    );
};

export default AddCategory;
