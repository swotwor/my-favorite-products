import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 'allProduct',
    currentProductCard: {},
    productItems: [],
    authData: {
        clientId: '',
        credential: '',
    },
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        changeCurrentProduct: (state, action) => {
            state.currentPage = action.payload;
            
            if(action.payload) {
                sessionStorage.setItem('currentPage', `${action.payload}`);
            } else {
                sessionStorage.setItem('currentPage', `allProduct`);
                state.currentPage = 'allProduct'
            }
        },
        setAuthData: (state, action) => {
            state.authData = action.payload;
        },
        setCurrentProductCard: (state, action) => {
            state.currentProductCard = action.payload
        },
        setProducts: (state, action) => {
            state.productItems = [...action.payload]
        }
    },
});

export const {
    setAuthData,
    setProducts,
    changeCurrentProduct,
    setCurrentProductCard,
} = productSlice.actions;

export default productSlice.reducer;
