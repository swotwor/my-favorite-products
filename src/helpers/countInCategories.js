export function countInCategories(products, category) {
    let count = 0;
    products.forEach(element => element.category === category ? count++ : null);
    return count;
}