import style from './index.module.scss';
import EditCard from './components/editCard/EditCard';
import ViewCard from './components/viewCard/ViewCard';
import { useState } from 'react';

const ProductCard = () => {
    const [editCard, setEditCard] = useState(false);

    const changeCardStatus = () => {
        setEditCard(prev => !prev);
    }

    return (
        <div className={''}>
            {editCard
                ? <EditCard changeCardStatus={changeCardStatus} />
                : <ViewCard changeCardStatus={changeCardStatus} />
            }
        </div>
    );
};

export default ProductCard;
