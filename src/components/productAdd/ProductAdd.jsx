import style from './index.module.scss';
import Resizer from 'react-image-file-resizer';
import { useState } from 'react';
import ProductAddHeader from './components/productAddHeader/ProductAddHeader';
import { addNewProduct } from '../../logic/logic';
import { useDispatch, useSelector } from 'react-redux';


import { collection, getDocs, getDoc, addDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { app } from '../../firebase';
// import { firebaseConfig } from '../../firebase';



const ProductAdd = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.products.appData);
    const [stateProduct, setStateProduct] = useState({
        cost: '',
        title: '',
        location: '',
        description: '',
    });
    const [file, setFile] = useState(null);

    const handleFileChange = async (event) => {
        setFile(event.target.files[0]);
    };

    const handleInputChange = (event, field) => {
        setStateProduct({ ...stateProduct, [field]: event.target.value });
    };

    const allValuesFilled = Object.values(stateProduct).every(value => value !== '');

    const handleClickOnButton = async () => {
        // if (allValuesFilled && file) {
        //     addNewProduct(file, stateProduct, dispatch, Resizer, userData);
        // } else {
        //     alert('Не всі поля заповнені');
        // }

        // const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        try {
            const querySnapshot = await getDocs(collection(db, "swotwor"));
            querySnapshot.forEach((doc) => {
                console.log(doc);
            });
        } catch (error) {
            console.log(error);
        }

        // try {
        //     const docRef = await addDoc(collection(db, "users"), {
        //       first: "Ada",
        //       last: "Lovelace",
        //       born: 1815
        //     });
        //     console.log("Document written with ID: ", docRef.id);
        //   } catch (e) {
        //     console.error("Error adding document: ", e);
        //   }
    };


    return (
        <div className={style.wrapper}>
            <ProductAddHeader />
            <p>Назва</p>
            <input
                type="text"
                value={stateProduct.title}
                onChange={(event) => handleInputChange(event, 'title')}
            />
            <p>Вартість, грн</p>
            <input
                type="number"
                value={stateProduct.cost}
                onChange={(event) => handleInputChange(event, 'cost')}
            />
            <p>Де купували</p>
            <input
                type="text"
                value={stateProduct.location}
                onChange={(event) => handleInputChange(event, 'location')}
            />
            <p>Опис товару</p>
            <input
                type="text"
                value={stateProduct.description}
                onChange={(event) => handleInputChange(event, 'description')}
            />
            <p>Прікрипити фотографію</p>
            <input
                type="file"
                onChange={handleFileChange}
                accept=".jpg, .png, .jpeg, .png"
            />
            <button onClick={handleClickOnButton}>Додати</button>
        </div>
    );
};

export default ProductAdd;
