export const userProductExample = {
    id: '',
    userName: '',
    dataBase: {
        productItems: [],
        categories: [],
        lists: [],
        recipes: [],
    },
};

export const newUser = {
    userName: 'Swotwor',
    dataBase: {
        productItems: [
            {
                id: '1',
                img: 'https://i.imgur.com/u8IxLiT.jpg',
                cost: '321',
                title: '312',
                location: '312',
                category: 'мясо',
                deleteHash: 'ZqqXr1HQIqptqLH',
                description: '321',
            },
        ],
        categories: ['мясо', 'молочка', 'каши'],
        lists: [
            {
                title: 'Скупитья сегодня',
                productListForBuy: [
                    {
                        id: '1',
                        img: 'https://i.imgur.com/u8IxLiT.jpg',
                        cost: '321',
                        title: '312',
                        location: '312',
                        category: 'мясо',
                        deleteHash: 'ZqqXr1HQIqptqLH',
                        description: '321',
                    },
                ],
            },
        ],
        recipes: [
            {
                title: 'Торт',
                productListForRecipes: [
                    {
                        id: '1',
                        img: 'https://i.imgur.com/u8IxLiT.jpg',
                        cost: '321',
                        title: '312',
                        location: '312',
                        category: 'мясо',
                        deleteHash: 'ZqqXr1HQIqptqLH',
                        description: '321',
                    },
                ],
            },
        ],
    },
};
