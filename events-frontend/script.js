let cart = [];


const contentDisplay = document.querySelector('#content-display')
const cartItemsDisplay = document.querySelector('#list-products')
const cartSubtotal = document.querySelector('#cart-subtotal')
const cartCount = document.querySelector('#cart-count')
const cartProducts = document.querySelector('.cart-products')
const cartIcon = document.querySelector('#cart-icon')

const fetchData = async (sorter = null) => {
    try {
        const response = await fetch('db.json')
        let data = await response.json()

        if (sorter === 'price-asc') {
            data = data.sort((a, b) => a.price - b.price)
        } else if (sorter === 'price-desc') {
            data = data.sort((a, b) => b.price - a.price)
        } else if (sorter === 'date') {
            data = data.sort((a, b) => new Date(a.date) - new Date(b.date))
        }

        let output = ''

        data.forEach(({ imageUrl, id, title, date, location, price }) => {
            output += `
                <div class="content">
                    <img src="${imageUrl}" alt="${id}" loading="lazy" />
                    <div class="content__description">
                        <h4>${title}</h4>
                        <p>${date}</p>
                        <p>${location}</p>
                        <p>ksh.${price}</p>
                        <button class="add-to-cart" data-id="${id}" data-title="${title}" data-price="${price}">Add to Cart</button>
                    </div>
                </div>
            `
        })
        contentDisplay.innerHTML = output


        const addToCartButtons = document.querySelectorAll('.add-to-cart')
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id')
                const title = button.getAttribute('data-title')
                const price = parseFloat(button.getAttribute('data-price'))

                addToCart({ id, title, price, quantity: 1 })
            })
        })

    } catch (error) {
        console.log(error)
    }
}
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id)

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product)
    }
    updateCartDisplay()
    updateCartSubtotal()
    updateCartCount()

    cartProducts.style.display = 'block';
}
function updateCartDisplay() {
    cartItemsDisplay.innerHTML = ''

    cart.forEach(item => {
        const itemElement = document.createElement('div')
        itemElement.classList.add('cart-item')
        itemElement.innerHTML = `
            <p>${item.title} x (${item.quantity}) - ksh.${item.price * item.quantity}</p>
        `
        cartItemsDisplay.appendChild(itemElement)
    })
}

function updateCartSubtotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    cartSubtotal.textContent = subtotal.toFixed(2);
}
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = count
    cartCount.style.display = count > 0 ? 'inline-block' : 'none'
}

cartIcon.addEventListener('click', () => {
    if (cartProducts.style.display === 'block') {
        cartProducts.style.display = 'none';
    } else {
        cartProducts.style.display = 'block';
    }
})

document.querySelector('#close-cart').addEventListener('click', () => {
    cartProducts.style.display = 'none'
})



fetchData()

const priceascending = document.querySelector('#price-asc')
const pricedescending = document.querySelector('#price-desc')
const sortdateasc = document.querySelector('#date')

priceascending.addEventListener('click', () => fetchData('price-asc'))
pricedescending.addEventListener('click', () => fetchData('price-desc'))
sortdateasc.addEventListener('click', () => fetchData('date'))

const subtotal = document.querySelector('#subtotal')

document.querySelector('#close-cart').addEventListener('click', () => {
    document.querySelector('.cart-products').style.display = 'none'
})

