import style from './index.module.scss';
import { useState } from "react";
import { isProductSelected } from '../../../../../../../../logic/logic';

const EditModeCard = ({ item, handleClickOnCard, listState }) => {
    const [amountState, setAmountState] = useState(item?.amount || '');

    const handleChangeAmount = event => {
        setAmountState(event.target.value);
        handleClickOnCard(false, { ...item, amount: amountState });
    };

    console.log(item);

    return (
        <div
            onClick={() => handleClickOnCard(item)}
            className={style.editModeWrapper_card}
            style={{
                backgroundColor: isProductSelected(listState, item.id)
                    ? 'rgba(0, 130, 0, 0.8)'
                    : null,
            }}
        >
            <div className={style.viewCard}>
                <img
                    className={style.viewCard_productImg}
                    src={item.img}
                    alt="product img"
                />
                <div className={style.viewCard_contentBox}>
                    <div className={style.viewCard_name}>
                        <div className={style.viewCard_nameLeftBlock}>
                            <p className={style.viewCard_title}>
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
                    >
                        {item.amount}
                    </input>
                    <p className={style.viewCard_location}>{item.location}</p>
                </div>
            </div>
        </div>
    );
};

export default EditModeCard;
