import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, LayoutDashboard, ShoppingBag, Plus, Trash2, Edit, AlertCircle, CheckCircle, Package } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Admin.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const Admin = () => {
  const { 
    currentUser, 
    orders, 
    products, 
    updateOrderStatus, 
    addProduct, 
    deleteProduct,
    logout 
  } = useContext(AppContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'products'
  
  // Product Form Fields
  const [prodTitle, setProdTitle] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodFeatures, setProdFeatures] = useState('');
  const [prodImage, setProdImage] = useState(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Access check
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="admin-denied container"
      >
        <div className="denied-box">
          <Shield size={48} className="denied-icon" />
          <h2>Access Denied</h2>
          <p>This dashboard is only accessible to system administrators.</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Sign In as Admin
          </button>
        </div>
      </motion.div>
    );
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!prodTitle || !prodPrice || !prodDesc || !prodFeatures || !prodImage) {
      setError('Please fill in all product fields and select an image file.');
      return;
    }

    const priceNum = parseFloat(prodPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid price.');
      return;
    }

    // Build FormData for multipart upload
    const formData = new FormData();
    formData.append('title', prodTitle);
    formData.append('price', priceNum);
    formData.append('desc', prodDesc);
    formData.append('features', prodFeatures);
    formData.append('image', prodImage);

    try {
      await addProduct(formData);

      setSuccess('Product added successfully!');
      // Reset form fields
      setProdTitle('');
      setProdPrice('');
      setProdDesc('');
      setProdFeatures('');
      setProdImage(null);
      
      // Reset the file input element in DOM
      const fileInput = document.getElementById('prod-image');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError(err.message || 'Failed to add product.');
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      setSuccess('Product deleted successfully!');
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    setSuccess(`Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="admin-page container"
    >
      <div className="admin-header">
        <div className="admin-title-box">
          <LayoutDashboard size={28} className="title-icon" />
          <h1>Admin Dashboard</h1>
        </div>
        <button className="btn-outline logout-btn" onClick={() => { logout(); navigate('/login'); }}>
          Log Out
        </button>
      </div>

      {success && (
        <div className="admin-alert success-alert">
          <CheckCircle size={16} />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="admin-alert error-alert">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs Menu */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => { setActiveTab('orders'); setError(''); setSuccess(''); }}
        >
          <ShoppingBag size={18} />
          <span>Manage Orders ({orders.length})</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => { setActiveTab('products'); setError(''); setSuccess(''); }}
        >
          <Package size={18} />
          <span>Manage Products ({products.length})</span>
        </button>
      </div>

      <div className="admin-content-container">
        {/* Orders Management Tab */}
        {activeTab === 'orders' && (
          <div className="admin-orders-tab">
            <h2>Customer Orders</h2>
            
            {orders.length === 0 ? (
              <p className="no-data-msg">No orders placed yet.</p>
            ) : (
              <div className="orders-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Customer Details</th>
                      <th>Items Purchased</th>
                      <th>Total Paid</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <span className="order-id-txt">{order.id}</span>
                        </td>
                        <td>{order.date.split(',')[0]}</td>
                        <td>
                          <div className="customer-cell">
                            <strong>{order.shippingDetails.name}</strong>
                            <span>{order.userEmail}</span>
                            <span>{order.shippingDetails.phone}</span>
                          </div>
                        </td>
                        <td>
                          <div className="items-cell">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="item-line">
                                {item.product.title} <strong>x{item.quantity}</strong>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td><strong>₹{order.total}</strong></td>
                        <td><span className="payment-method-badge">{order.paymentMethod}</span></td>
                        <td>
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons-cell">
                            <select 
                              value={order.status} 
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className="status-select"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Products Management Tab */}
        {activeTab === 'products' && (
          <div className="admin-products-tab">
            <div className="products-tab-layout">
              {/* Product Form */}
              <div className="add-product-card">
                <h3>Add New Product</h3>
                <form className="add-product-form" onSubmit={handleAddProduct}>
                  <div className="form-group">
                    <label htmlFor="prod-title">Product Title *</label>
                    <input 
                      type="text" 
                      id="prod-title" 
                      placeholder="e.g. Scalp Purifying Serum" 
                      value={prodTitle}
                      onChange={(e) => setProdTitle(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="prod-price">Price (INR) *</label>
                    <input 
                      type="number" 
                      id="prod-price" 
                      placeholder="e.g. 450" 
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="prod-desc">Description *</label>
                    <textarea 
                      id="prod-desc" 
                      placeholder="Product description detailing its benefits..."
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="prod-features">Features (comma-separated list) *</label>
                    <input 
                      type="text" 
                      id="prod-features" 
                      placeholder="Feature 1, Feature 2, Feature 3" 
                      value={prodFeatures}
                      onChange={(e) => setProdFeatures(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="prod-image">Product Image *</label>
                    <input 
                      type="file" 
                      id="prod-image" 
                      accept="image/*"
                      onChange={(e) => setProdImage(e.target.files[0])}
                      required 
                    />
                  </div>

                  <button type="submit" className="btn-primary add-submit-btn">
                    <Plus size={16} />
                    <span>Create Product</span>
                  </button>
                </form>
              </div>

              {/* Product List */}
              <div className="product-list-card">
                <h3>Active Products List</h3>
                <div className="admin-product-grid">
                  {products.map((prod) => (
                    <div key={prod.id} className="admin-prod-item">
                      <div 
                        className="prod-thumbnail" 
                        style={{ backgroundImage: `url("${prod.image}")` }}
                      ></div>
                      <div className="prod-info">
                        <h4>{prod.title}</h4>
                        <div className="prod-sub-meta">
                          <span className="price-tag">₹{prod.price}</span>
                          <span className={`type-tag ${prod.isDefault ? 'default' : 'custom'}`}>
                            {prod.isDefault ? 'Default' : 'Custom'}
                          </span>
                        </div>
                      </div>
                      <div className="prod-actions">
                        {!prod.isDefault ? (
                          <button 
                            className="btn-delete"
                            onClick={() => handleDeleteProduct(prod.id)}
                            title="Delete custom product"
                          >
                            <Trash2 size={16} />
                          </button>
                        ) : (
                          <span className="action-lock-label" title="Default products cannot be deleted">Locked</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Admin;
