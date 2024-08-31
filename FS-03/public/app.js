document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
        await loadProductDetail(productId);
    } else {
        await loadProducts();
    }
});

async function loadProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    
    const featuredProductsContainer = document.getElementById('featured-products');
    const productListContainer = document.getElementById('product-list');

    if (featuredProductsContainer) {
        products.slice(0, 4).forEach(product => {
            featuredProductsContainer.innerHTML += generateProductCard(product);
        });
    }

    if (productListContainer) {
        products.forEach(product => {
            productListContainer.innerHTML += generateProductCard(product);
        });
    }
}

async function loadProductDetail(id) {
    const response = await fetch(`/api/products/${id}`);
    const product = await response.json();
    
    const productDetailContainer = document.getElementById('product-detail');
    if (productDetailContainer) {
        productDetailContainer.innerHTML = `
            <div class="product-card">
                <img src="${product.imageUrl}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>$${product.price}</p>
                <button>Add to Cart</button>
            </div>
        `;
    }
}

function generateProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <a href="product.html?id=${product._id}"><p style="text-align:center;">View Details</p></a>
        </div>
    `;
}
