import './App.css';
import Lists from './pages/lists/Lists';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Loader from './components/loader/Loader';
import Categories from './pages/categories/Categories';
import AllProduct from './pages/allProduct/AllProduct';
import ProductAdd from './pages/productAdd/ProductAdd';
import ProductCard from './pages/productCard/ProductCard';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { extractTokenAndUsername, checkUserInDataBase } from './logic/logic';

const App = () => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.products.loader);

    useEffect(() => {
        extractTokenAndUsername();
        checkUserInDataBase(dispatch);
    }, []);

    return (
        <div className="mainWrapper">
            <Header />
            <Routes>
                <Route path='/' element={<AllProduct />}/>
                <Route path='/lists' element={<Lists />}/>
                <Route path='/categories' element={<Categories />}/>
                <Route path='/product_add' element={<ProductAdd />}/>
                <Route path='/product_card' element={<ProductCard />}/>
            </Routes>
            {
                loader
                    ? <Loader />
                    : null
            }
            <Footer />
        </div>
    );
};

export default App;
