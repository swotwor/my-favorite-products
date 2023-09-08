import { isProductSelected } from '../../../../../../../../logic/logic';
import style from './index.module.scss';
import { useState } from "react";

const EditModeCard = ({ item, handleClickOnCard }) => {
    const [amountState, setAmountState] = useState();

    const handleChangeAmount = event => {
        handleClickOnCard(false, { ...item, amount: event.target.value });
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
                    alt="viewCard_productImg"
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
                        onClick={(event) => event.stopPropagation()}
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
