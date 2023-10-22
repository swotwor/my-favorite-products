export function countInCategories(products, categoryId) {
    let count = 0;
    products.forEach((element) =>
        element.category == categoryId ? count++ : null
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

// export function sortCategories(app, ) {
//     return app.categories.map((item) => {
//         <div>
//             <p>{item.title}</p>
//             {openCategory == item.title ? (
//                 <div>
//                     <Link
//                         to="/product_card"
//                         key={productItem.id}
//                         onClick={() => handleClick(productItem)}
//                     >
//                         <ViewCard productItem={productItem} />
//                     </Link>
//                 </div>
//             ) : null}
//         </div>;
//     });
// }
