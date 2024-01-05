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
        },
        remove(id) {
            // ambil item yang mau di remove berdasarkan id
            const carItem = this.items.find((item) => item.id === id);

            // jika item lebih dari 1
            if (carItem.quantity > 1) {
                //telusuri 1 1 
                this.items = this.items.map((item) => {
                    // jika bukan barang yang di klik, maka skip
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (carItem.quantity === 1) {
                // jika barang sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= carItem.price;
            }
        },
    });
});

// form validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function() {
    for(let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

// kirim data ketika tombol checkout di klik.s
checkoutButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objectData = Object.fromEntries(data);
    // const message = formatMessage(objectData);
    // window.open('http://wa.me/6285835300072?text=' + encodeURIComponent(message));

    // request transsaction token dengan ajax / fetch
    try {
        const response = await fetch('php/placeOrder.php', {
            method: 'POST',
            body: data,
        });
        const token = await response.text();
        console.log(token);
        // window.snap.pay('TRANSACTION_TOKEN_HERE');
    } catch (error) {
        console.log(error.message);
    }
    
});

// format pesan whatsapp
const formatMessage = (object) => {
    return `Data Customer
        Nama: ${object.name}
        Email: ${object.email}
        Phone: ${object.phone}
Data Pesanan
        ${JSON.parse(object.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
TOTAL: ${rupiah(object.total)}
Syukran katsiran :)`;
};

// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};