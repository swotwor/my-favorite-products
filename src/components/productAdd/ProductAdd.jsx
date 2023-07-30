import style from './index.module.scss';
import { useState } from 'react';
import ProductAddHeader from './components/productAddHeader/ProductAddHeader';
import { addNewProduct, getCurrentAccount } from '../../logic/logic';

const ProductAdd = () => {
    const [stateProduct, setStateProduct] = useState({
        img: '',
        cost: '',
        title: '',
        location: '',
        description: '',
    });

    const handleInputChange = (event, field) => {
        setStateProduct({ ...stateProduct, [field]: event.target.value });
    };
    
    const allValuesFilled = Object.values(stateProduct).every(value => value !== '');
    
    const handleClickOnButton = () => {
        // if(allValuesFilled) {
        //     addNewProduct(stateProduct);
        //     setStateProduct({
        //         img: '',
        //         cost: '',
        //         title: '',
        //         location: '',
        //         description: '',
        //     })
        // } else {
        //     alert('Не всі поля заповнені')
        // }
        
        getCurrentAccount();
    };

    return (
        <div className={style.wrapper}>
            <ProductAddHeader />
            <p>Посилання на фото</p>
            <input
                type="text"
                value={stateProduct.img}
                onChange={event => handleInputChange(event, 'img')}
            />
            <p>Назва</p>
            <input
                type="text"
                value={stateProduct.title}
                onChange={event => handleInputChange(event, 'title')}
            />
            <p>Вартість</p>
            <input
                type="text"
                value={stateProduct.cost}
                onChange={event => handleInputChange(event, 'cost')}
            />
            <p>Де купували</p>
            <input
                type="text"
                value={stateProduct.location}
                onChange={event => handleInputChange(event, 'location')}
            />
            <p>Опис товару</p>
            <input
                type="text"
                value={stateProduct.description}
                onChange={event => handleInputChange(event, 'description')}
            />
            <button onClick={handleClickOnButton}>Додати</button>

            <a href='https://www.dropbox.com/oauth2/authorize?client_id=zcq3lp9ddt5q9sj&redirect_uri=http://localhost:5173&response_type=code'>DROPBOX</a>
        </div>
    );
};

export default ProductAdd;
