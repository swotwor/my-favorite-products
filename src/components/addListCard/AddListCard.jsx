import style from './index.module.scss';

const AddListCard = ({ item, handleClickOnCard }) => {

    const handleChangeAmount = event => {
        handleClickOnCard(false, { ...item, amount: event.target.value });
    };

    return (
        <div
            className={style.addListCard}
            onClick={() => handleClickOnCard(true, { ...item})}
        >
            <img
                src={item.img}
                alt="addListCard_productImg"
                className={style.addListCard_productImg}
            />
            <div className={style.addListCard_contentBox}>
                <div className={style.addListCard_name}>
                    <div className={style.addListCard_nameLeftBlock}>
                        <p className={style.addListCard_title}>
                            {item.title} - {item.cost} грн
                        </p>
                    </div>
                </div>
                <input
                    onClick={event => event.stopPropagation()}
                    onChange={handleChangeAmount}
                    className={style.addListCard_productDescription}
                    placeholder="Яка кількість"
                >
                    {item.amount}
                </input>
                <p className={style.addListCard_location}>{item.location}</p>
            </div>
        </div>
    );
};

export default AddListCard;
