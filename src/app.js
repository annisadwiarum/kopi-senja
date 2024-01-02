document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
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
            // cek apakah ada barang yang sama di cart atau tidak
            const carItem = this.items.find((item) => item.id === newItem.id);

            // kalau barang belum ada / kosong di cart
            if (!carItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                // kalau barang sudah ada di cart. cek apakah barng beda atau sama
                this.items = this.items.map((item) => {
                    // barang beda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        // ternyata barang sama, maka tinggal tambah quantity dan totalkan harga
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
            console.log(this.quantity)
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