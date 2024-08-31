document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api/products'; // Update if using a different port or base URL

    // Elements
    const productList = document.getElementById('product-list');
    const addProductForm = document.getElementById('add-product-form');
    const productName = document.getElementById('product-name');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const productImageUrl = document.getElementById('product-image-url');
    const productCategory = document.getElementById('product-category');

    // Fetch and display products
    const fetchProducts = async () => {
        try {
            const response = await fetch(apiUrl);
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const renderProducts = (products) => {
        productList.innerHTML = products.map(product => `
            <div class="product-card" id="product-${product._id}">
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Category: ${product.category}</p>
                <p style="text-align:center;"><button onclick="deleteProduct('${product._id}')">Delete</button></p> 
                <p style="text-align:center;"><button onclick="showUpdateForm('${product._id}', '${product.name}', '${product.description}', ${product.price}, '${product.imageUrl}', '${product.category}')">Update</button></p>
            </div>
        `).join('');
    };

    // Add new product
    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const product = {
            name: productName.value,
            description: productDescription.value,
            price: parseFloat(productPrice.value),
            imageUrl: productImageUrl.value,
            category: productCategory.value
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            const newProduct = await response.json();
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });

    // Delete product
    window.deleteProduct = async (id) => {
        try {
            await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            document.getElementById(`product-${id}`).remove();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Show update form
    window.showUpdateForm = (id, name, description, price, imageUrl, category) => {
        // Populate the form with existing product details
        productName.value = name;
        productDescription.value = description;
        productPrice.value = price;
        productImageUrl.value = imageUrl;
        productCategory.value = category;

        // Add an event listener to update the product
        addProductForm.removeEventListener('submit', handleAddProduct); // Remove the old event listener
        addProductForm.addEventListener('submit', (e) => handleUpdateProduct(e, id));
    };

    // Update product
    const handleUpdateProduct = async (e, id) => {
        e.preventDefault();

        const updatedProduct = {
            name: productName.value,
            description: productDescription.value,
            price: parseFloat(productPrice.value),
            imageUrl: productImageUrl.value,
            category: productCategory.value
        };

        try {
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct)
            });
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Initial fetch of products
    fetchProducts();
});
