import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentProductCard: {},
    productItems: [],
};

export const productSlice = createSlice({
    name: 'products', 
    initialState,
    reducers: {
        setCurrentProductCard: (state, action) => {
            state.currentProductCard = action.payload
        },
        setAppData: (state, action) => {
            state.productItems = [...action.payload]
        },
        setProductItem: (state, action) => {
            console.log(action)
            state.productItems = [...state.productItems, action.payload]
        }
    },
});

export const {
    setAppData,
    setProductItem,
    setCurrentProductCard,
} = productSlice.actions;

export default productSlice.reducer;
