import style from './index.module.scss';
import { useState } from 'react';

const AddListCard = ({ item, handleClickOnCard }) => {
    const [amountState, setAmountState] = useState(item.amount)
    const handleChangeAmount = event => {
        setAmountState(event.target.value);
        handleClickOnCard(false, { ...item, amount: amountState });
    };

    return (
        <div
            className={style.addListCard}
            onClick={() => handleClickOnCard(true, { ...item})}
        >
            <img
                src={item.img}
                alt="product img"
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
                    value={amountState}
                    onClick={event => event.stopPropagation()}
                    onChange={handleChangeAmount}
                    className={style.addListCard_productDescription}
                    placeholder="Яка кількість"
                />
                <p className={style.addListCard_location}>{item.location}</p>
            </div>
        </div>
    );
};

export default AddListCard;
