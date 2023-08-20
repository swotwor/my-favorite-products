import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appData: {
        id: '',
        userName: '',
        dataBase: {
            productItems: [],
            categories: [],
            lists: [],
            recipes: [],
        },
        currentProductCard: {},
    },
};

export const productSlice = createSlice({
    name: 'products', 
    initialState,
    reducers: {
        setCurrentProductCard: (state, action) => {
            state.currentProductCard = action.payload
        },
        setAppData: (state, action) => {
            const responseUserApp = action.payload
                .filter(item => item.userName !== localStorage.getItem('userName'))[0];
            state.appData = {...responseUserApp};
        },
        setProductItem: (state, action) => {
            state.productItems = [...state.productItems, action.payload]
        },
        deleteProduct: (state, action) => {
            state.productItems = [...state.productItems.filter(item => item.id !== action.payload.id)];
        }
    },
});

export const {
    setAppData,
    deleteProduct,
    setProductItem,
    setCurrentProductCard,
} = productSlice.actions;

export default productSlice.reducer;
