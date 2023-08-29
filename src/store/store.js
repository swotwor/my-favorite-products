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
};

export const productSlice = createSlice({
    name: 'products', 
    initialState,
    reducers: {
        setCurrentProductCard: (state, action) => {
            state.currentProductCard = action.payload
        },
        setAppData: (state, action) => {
            const responseUserApp = action.payload;
            state.appData = {...responseUserApp};
        },
        setProductItem: (state, action) => {
            state.appData.dataBase.productItems = [
                ...state.appData.dataBase.productItems,
                ...action.payload.dataBase.productItems
            ]
        },
        deleteProduct: (state, action) => {
            state.appData.dataBase.productItems = [...action.payload];
        },
    },
});

export const {
    setAppData,
    deleteProduct,
    setProductItem,
    setCurrentProductCard,
} = productSlice.actions;

export default productSlice.reducer;
