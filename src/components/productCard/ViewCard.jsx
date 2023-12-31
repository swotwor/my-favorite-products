import style from './index.module.scss';

const ViewCard = ({ productItem }) => {
    const { title, img, cost, description, location, amount } = productItem;

    return (
        <div className={style.viewCard}>
            <img className={style.viewCard_productImg} src={img} alt="viewCard_productImg" />
            <div className={style.viewCard_contentBox}>
                <div className={style.viewCard_mainContentBox}>
                    <div className={style.viewCard_name}>
                        <p className={style.viewCard_title}>
                            {title}
                            {
                                cost
                                    ? ` - ${cost} грн`
                                    : null
                            }
                        </p>
                    </div>
                    {
                        amount
                            ? amount
                                ? <p className={style.viewCard_productDescription}>{amount}</p>
                                : null
                            : description
                                ? <p className={style.viewCard_productDescription}>{description}</p>
                                : null
                    }
                </div>
                {
                    location
                        ? <p className={style.viewCard_location}>{location}</p>
                        : null
                }
            </div>
        </div>
    );
};

export default ViewCard;
