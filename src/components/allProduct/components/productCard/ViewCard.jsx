import style from './index.module.scss';
import { useEffect } from 'react';

const ViewCard = ({ productItem }) => {
    const { title, img, cost, description, location } = productItem;

    useEffect(() => {
        sessionStorage.setItem('productItem', JSON.stringify(productItem));
    },[])

    return (
        <div className={style.viewCard}>
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
