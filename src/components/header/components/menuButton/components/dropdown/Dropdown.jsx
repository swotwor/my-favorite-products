import style from './index.module.scss'
import { Link } from 'react-router-dom';

const Dropdown = () => {
    return (
        <div className={style.dropdownWrapper}>
            <ul>
                <li>
                    <Link to={'/'}>
                        Всі продукти
                    </Link>
                </li>
                <li>
                    <Link to={'/categories'}>
                        Категорії
                    </Link>
                </li>
                <li>
                    <Link to={'/lists'}>
                        Списки
                    </Link>
                </li>
                <li>
                    <Link to={'/product_add'}>
                        Додати
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Dropdown;