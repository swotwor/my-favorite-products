import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { setCurrentProductCard } from '../../../../store/store';

const ViewCard = ({ productItem }) => {
    const dispatch = useDispatch();
    const { title, img, cost, description, location } = productItem;

    function handleClick() {
        dispatch(setCurrentProductCard(productItem));
        sessionStorage.setItem('productItem', JSON.stringify(productItem))
    }

    return (
        <div className={style.viewCard} onClick={handleClick}>
            <img className={style.viewCard_productImg} src={img} alt="viewCard_productImg" />
            <div className={style.viewCard_contentBox}>
                <div className={style.viewCard_name}>
                    <div className={style.viewCard_nameLeftBlock}>
                        <p className={style.viewCard_title}>{title} - {cost} грн</p>
                    </div>
                </div>
                <p className={style.viewCard_productDescription}>{description}</p>
                <p className={style.viewCard_location}>{location}</p>
            </div>
        </div>
    );
};

export default ViewCard;
