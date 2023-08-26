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
            console.log('action.dataBase.productItems', action.payload.dataBase.productItems);
            console.log('state.dataBase.productItems', state.dataBase.productItems);
            state.dataBase.productItems = [...action.payload.dataBase.productItems]
        },
        deleteProduct: (state, action) => {
            state.productItems = [...state.productItems.filter(item => item.id !== action.payload.id)];
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
