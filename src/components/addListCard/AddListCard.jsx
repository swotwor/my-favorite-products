import { useState } from 'react';
import style from './index.module.scss';

const AddListCard = ({ item }) => {
    const [amountState, setAmountState] = useState('');

    const handleChangeAmount = (event) => {
        setAmountState(event.target.value)
    }
    // const {} = item
    return (
        <div className={style.addListCard}>
            <img className={style.addListCard_productImg} src={item.img} alt="addListCard_productImg" />
            <div className={style.addListCard_contentBox}>
                <div className={style.addListCard_name}>
                    <div className={style.addListCard_nameLeftBlock}>
                        <p className={style.addListCard_title}>{item.title} - {item.cost} грн</p>
                    </div>
                </div>
                <input
                    value={amountState}
                    onClick={event => event.stopPropagation()}
                    onChange={handleChangeAmount}
                    className={style.addListCard_productDescription}
                >{item.amount}</input>
                <p className={style.addListCard_location}>{item.location}</p>
            </div>
        </div>
    );
};

export default AddListCard;