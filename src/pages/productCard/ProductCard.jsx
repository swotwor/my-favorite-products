// import style from './index.module.scss';
import EditCard from './components/editCard/EditCard';
import ViewCard from './components/viewCard/ViewCard';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCurrentProductCard } from '../../store/store';

const ProductCard = () => {
    const dispatch = useDispatch();
    const [editCard, setEditCard] = useState(false);
    
    const changeCardStatus = () => {
        setEditCard(prev => !prev);
    };
    
    useEffect(() => {
        dispatch(setCurrentProductCard(
            JSON.parse(sessionStorage.getItem('productItem')))
        );
    }, []);

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
