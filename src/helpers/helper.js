export function countInCategories(products, category) {
    let count = 0;
    products.forEach((element) =>
        element.category === category ? count++ : null
    );
    return count;
}

export function returnCategoryTitle(categories, id) {
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].id == id) {
            return categories[i].title;
        }
    }
}

export function sortByTitle(categories) {
    const sortedArray = [...categories];
    sortedArray.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });

    return sortedArray;
}
