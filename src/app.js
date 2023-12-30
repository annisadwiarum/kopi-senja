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

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            //mengecek apakah ada barang di dalam cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada, alias kosong
            if (!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price});
            } else {
                // mengecek jika barang sudah ada, berangnya beda atau sama
                this.item = this.items.map((item) => {
                    // jika barang beda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        // jika barang ternyata sama, cukup tambah quantity dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
    });
});

// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};