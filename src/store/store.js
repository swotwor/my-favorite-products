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
        setList: (state, action) => {
            state.appData = action.payload;
        },
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
    setList,
    setLoader,
    setAppData,
    deleteProduct,
    setProductItem,
    setCurrentProductCard,
} = productSlice.actions;

export default productSlice.reducer;
