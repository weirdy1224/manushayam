const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    default: '4.5'
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
