import './App.css';
import Header from './components/header/Header';
import AllProduct from './components/allProduct/AllProduct';
import ProductAdd from './components/productAdd/ProductAdd';
import ProductCard from './components/productCard/ProductCard';
import { useEffect } from 'react';
import { getPoducts } from './logic/logic';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getPoducts(dispatch);
    }, []);

    return (
        <div className="mainWrapper">
            <Header />
            <Routes>
                <Route path='/' element={<AllProduct />}/>
                <Route path='/product_add' element={<ProductAdd />}/>
                <Route path='/product_card' element={<ProductCard />}/>
            </Routes>
        </div>
    );
};

export default App;
