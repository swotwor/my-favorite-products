import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appData: {
        userName: '',
        dataBase: {
            productItems: [],
            categories: [],
            lists: [],
            recipes: [],
        },
    },
    currentProductCard: {},
    loader: false,
};

export const productSlice = createSlice({
    name: 'products', 
    initialState,
    reducers: {
        setLoader: (state) => {
            state.loader = !state.loader;
        },
        setAppData: (state, action) => {
            const responseUserApp = action.payload;
            state.appData = {...responseUserApp};
        },
        deleteProduct: (state, action) => {
            state.appData.dataBase.productItems = [...action.payload];
        },
        setProductItem: (state, action) => {
            state.appData.dataBase.productItems = [
                ...state.appData.dataBase.productItems,
                ...action.payload.dataBase.productItems
            ];
        },
        setCurrentProductCard: (state, action) => {
            state.currentProductCard = action.payload;
        },
    },
});

export const {
    setLoader,
    setAppData,
    deleteProduct,
    setProductItem,
    setCurrentProductCard,
} = productSlice.actions;

export default productSlice.reducer;
