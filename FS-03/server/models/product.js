const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    category: String
});

module.exports = mongoose.model('Product', ProductSchema);
