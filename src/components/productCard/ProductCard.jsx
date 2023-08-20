// import style from './index.module.scss';
import EditCard from './components/editCard/EditCard';
import ViewCard from './components/viewCard/ViewCard';
import { useEffect, useState } from 'react';

const ProductCard = () => {
    const [editCard, setEditCard] = useState(false);
    const [currentProducCard, setCurrentProductCard] = useState({});
    
    const changeCardStatus = () => {
        setEditCard(prev => !prev);
    };
    
    useEffect(() => {
        setCurrentProductCard(
            JSON.parse(sessionStorage.getItem('productItem'))
            );
    }, []);

    return (
        <div className={''}>
            {editCard
                ? <EditCard changeCardStatus={changeCardStatus} currentProducCard={currentProducCard}/>
                : <ViewCard changeCardStatus={changeCardStatus} currentProducCard={currentProducCard}/>
            }
        </div>
    );
};

export default ProductCard;
