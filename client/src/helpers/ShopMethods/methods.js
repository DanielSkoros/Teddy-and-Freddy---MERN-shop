export const addToCart = (id, userIsLoggedIn, name, price, images, linkto) => {
    let cart = [];
    let itemToAdd = {
        id,
        count: 1,
        name,
        price,
        images,
        linkto
    };
    if (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')) !== []) {
        cart = JSON.parse(localStorage.getItem('cart'));
        let item = cart.find(el => el.id === id);
        if (!item) {
            cart.push(itemToAdd);
        } else {
            item.count ++;
        }
    } else {
        cart = [itemToAdd];
    }
    localStorage.setItem('cart', JSON.stringify(cart));
};