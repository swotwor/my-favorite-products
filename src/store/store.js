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
        setEditAppData: (state, action) => {
            state.appData = action.payload;
        },
        setLoader: (state) => {
            state.loader = !state.loader;
        },
        setCurrentProductCard: (state, action) => {
            state.currentProductCard = action.payload;
        },
    },
});

export const {
    setLoader,
    setEditAppData,
    setCurrentProductCard,
} = productSlice.actions;

export default productSlice.reducer;
