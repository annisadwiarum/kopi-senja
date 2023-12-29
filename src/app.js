document.addEventListener('alpine:init', () => {
    Alpine.data('productss', () => ({
        items: [
            { id: 1, name: 'Coffee Beans 1', img: 'product-01.jpg', price: 30000 },
            { id: 2, name: 'Coffee Beans 2', img: 'product-01.jpg', price: 55000 },
            { id: 3, name: 'Coffee Beans 3', img: 'product-01.jpg', price: 33000 },
            { id: 4, name: 'Coffee Beans 4', img: 'product-01.jpg', price: 40000 },
            { id: 5, name: 'Coffee Beans 5', img: 'product-01.jpg', price: 25000 },
        ],
    }));
});