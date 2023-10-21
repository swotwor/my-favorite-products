import { returnCategoryTitle } from '../../../../helpers/helper';
import style from './index.module.scss';
import { useSelector } from 'react-redux';

const ViewCard = ({ changeCardStatus }) => {
    const { currentProductCard } = useSelector(state => state.products);
    const { categories } = useSelector(state => state.products.appData.dataBase);
    const { title, img, cost, description, location, category } = currentProductCard;
    const categoryTitle = returnCategoryTitle(categories, category);

    return (
        <div className={style.viewCard}>
            <div className={style.viewCard_productPhoto} >
                <img src={img} alt="product_img" />
                <div onClick={changeCardStatus} className={style.viewCard_buttonChangeStatusCard}/>
            </div>
            <p className={style.viewCard_text}>Назва товару</p>
            <div className={style.viewCard_header}>
                <div className={style.viewCard_name}>
                    <p className={style.viewCard_title}>{title}</p>
                    {
                        cost
                            ? <p className={style.viewCard_cost}> - {cost}грн</p>
                            : null
                    }
                </div>
            </div>
            {
                description
                    ? <>
                        <p className={style.viewCard_text}>Опис товару</p>
                        <div className={style.viewCard_productDescription}>{description}</div>
                      </>
                    : null
            }
            {
                categoryTitle
                    ? <>
                        <p className={style.viewCard_text}>Категорія товару</p>
                        <div className={style.viewCard_category}>
                            {categoryTitle}
                        </div>
                      </>
                    : null
            }
            <p className={style.viewCard_text}>Місце продажу</p>
            <div className={style.viewCard_location}>
                {location}
            </div>
        </div>
    );
};

export default ViewCard;
