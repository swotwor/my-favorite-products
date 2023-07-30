import style from './index.module.scss';

const ViewCard = ({changeCardStatus}) => {
    const getProductItemFromSessionStorage = sessionStorage.getItem('productItem');
    const productInfo = getProductItemFromSessionStorage
            ? JSON.parse(getProductItemFromSessionStorage)
            : null;
    const { title, img, cost, description, location } = productInfo || {};

    return (
        <div className={style.viewCard}>
            <div className={style.viewCard_productPhoto} >
                <img src={img} alt="product_img" />
                <div onClick={changeCardStatus} className={style.viewCard_buttonChangeStatusCard}/>
            </div>
            <div className={style.viewCard_header}>
                <div className={style.viewCard_name}>
                    <p className={style.viewCard_title}>{title}</p>
                    <p className={style.viewCard_cost}> - {cost}грн</p>
                </div>
            </div>
            <div className={style.viewCard_productDescription}>
                {description}
            </div>
            <div className={style.viewCard_location}>
                {location}
            </div>
        </div>
    );
};

export default ViewCard;
