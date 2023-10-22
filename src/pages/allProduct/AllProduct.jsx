import style from './index.module.scss';
import ProductItem from './components/productItem/ProductItem';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AllProduct = () => {
    const [openCategory, setOpenCategory] = useState('');
    const app = useSelector((state) => state.products.appData.dataBase);
    const isAuth = document.cookie.split(';')[0].split('=')[1];

    useEffect(() => {
        sessionStorage.removeItem('productItem');
    }, []);
    
    return (
        <div className={style.allProduct}>
            <div className={style.allProduct_header}>
                Всі продукти
            </div>
            {
                isAuth
                    ? app.productItems.length
                        ? app.categories.map((item) => {
                            return <ProductItem
                                key={item.id}
                                item={item}
                                products={app.productItems}
                                openCategory={openCategory}
                                setOpenCategory={setOpenCategory}
                            />
                          })
                        : <p className={style.allProduct_noProducts}>Ще немає продуктів</p>
                    : <>
                        <p className={style.allProduct_noProducts}>Ви не авторизовані</p>
                        <p className={style.allProduct_noProducts}>(натисніть на шестерню)</p>
                      </>
            }
        </div>
    );
};

export default AllProduct;




// {
//     isAuth
//         ? app.productItems.length
//             ? app.productItems.map(productItem => {
//                 return (
                   
//                 );
//               })
//             : <p className={style.allProduct_noProducts}>Ще немає продуктів</p>
//         : <>
//             <p className={style.allProduct_noProducts}>Ви не авторизовані</p>
//             <p className={style.allProduct_noProducts}>(натисніть на шестерню)</p>
//           </>
// }