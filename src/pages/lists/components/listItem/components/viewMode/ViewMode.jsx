import style from './index.module.scss';
import editIcon from '../../../../../../assets/icons/editCard.png';
import ViewCard from '../../../../../../components/productCard/ViewCard';
import { useState } from 'react';

const ViewMode = ({ listItem, handleClickOnEditList }) => {
    const { title, productList } = listItem;
    const [openList, setOpenList] = useState(false);

    const handleClickOnOpenList = () => {
        setOpenList(prev => !prev);
    };

    return (
        <div className={style.viewModeWrapper}>
            <div className={style.viewModeWrapper_header}>
                <p
                    onClick={handleClickOnOpenList}
                    className={style.viewModeWrapper_title}
                >
                    {title}
                </p>
                <img
                    src={editIcon}
                    alt="editList"
                    onClick={handleClickOnEditList}
                />
            </div>
            {openList
                ? productList.map(item => (
                    <div className={style.viewCard} key={item.id}>
                        <img className={style.viewCard_productImg} src={item.img} alt="viewCard_productImg" />
                        <div className={style.viewCard_contentBox}>
                            <div className={style.viewCard_name}>
                                <div className={style.viewCard_nameLeftBlock}>
                                    <p className={style.viewCard_title}>{item.title} - {item.cost} грн</p>
                                </div>
                            </div>
                            <p className={style.viewCard_productDescription}>{item.description}</p>
                            <p className={style.viewCard_location}>{item.location}</p>
                        </div>
                    </div>
                  ))
                : null}
        </div>
    );
};

export default ViewMode;
