import style from './index.module.scss';

const ViewCard = ({ productItem }) => {
    const { title, img, cost, description, location, amount } = productItem;

    return (
        <div className={style.viewCard}>
            <img className={style.viewCard_productImg} src={img} alt="viewCard_productImg" />
            <div className={style.viewCard_contentBox}>
                <div className={style.viewCard_name}>
                    <div className={style.viewCard_nameLeftBlock}>
                        <p className={style.viewCard_title}>{title} - {cost} грн</p>
                    </div>
                </div>
                {
                    amount
                        ? <p className={style.viewCard_productDescription}>{amount}</p>
                        : <p className={style.viewCard_productDescription}>{description}</p>
                }
                
                <p className={style.viewCard_location}>{location}</p>
            </div>
        </div>
    );
};

export default ViewCard;
