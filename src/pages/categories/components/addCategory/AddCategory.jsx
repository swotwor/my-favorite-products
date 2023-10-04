import style from './index.module.scss';
import { useState } from 'react';

const AddCategory = ({ setAddtMode }) => {
    const [nameState, setNameState] = useState('');

    const handleClickOnSave = (event) => {
        event.preventdefault();
    };
    const handleClickOnCancel = () => {
        setAddtMode(false);
    };

    return (
        <form className={style.addCategoryWrapper}>
            <input
                type="text"
                value={nameState}
                onChange={(event) => setNameState(event.target.value)}
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
        </form>
    );
};

export default AddCategory;
