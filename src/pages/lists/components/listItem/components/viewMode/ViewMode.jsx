import style from './index.module.scss';
import editIcon from '../../../../../../assets/icons/editCard.png';
import { useState } from 'react';
import ViewCard from '../../../../../../components/productCard/ViewCard';

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
            {
                openList
                    ? productList.map(item => <ViewCard key={item.id} productItem={item} />)
                    : null
            }
        </div>
    );
};

export default ViewMode;
