import style from './index.module.scss';
import edit from '../../../../../../assets/icons/editCard.png'

const CategoryView = ({ category, setIdCategoryEdit }) => {
    return (
        <div className={style.categoryView_item} key={category.id}>
            <p className={style.categoryView_title}>{category.title}</p>
            <img
                alt="edit"
                src={edit}
                onClick={() => setIdCategoryEdit(category.id)}
                className={style.categoryView_icon}
            />
        </div>
    );
};

export default CategoryView;
