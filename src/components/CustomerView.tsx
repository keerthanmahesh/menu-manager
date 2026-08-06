'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Leaf, Flame, Star, ShoppingBag, Check } from 'lucide-react';
import { MenuItem, CategoryOption } from '@/types/menu';

interface CustomerViewProps {
  items: MenuItem[];
  categories: CategoryOption[];
}

export const CustomerView: React.FC<CustomerViewProps> = ({ items, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>('All');
  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalCartPrice = Object.entries(cart).reduce((sum, [id, count]) => {
    const item = items.find((i) => i.id === id);
    return sum + (item ? item.price * count : 0);
  }, 0);

  return (
    <div className="customer-menu-container animate-fade-in">
      {/* Restaurant Header */}
      <div className="restaurant-banner glass-panel">
        <div className="banner-content">
          <span className="live-badge">📱 LIVE DIGITAL MENU</span>
          <h1>Gourmet Bistro & Grill</h1>
          <p>Fresh ingredients, artisanal flavors, and memorable culinary experiences.</p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="customer-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="customer-grid">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`customer-card glass-card ${!item.isAvailable ? 'sold-out' : ''}`}
          >
            <div className="card-img-box">
              <Image
                src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="img"
              />
              {item.isPopular && (
                <span className="badge-star">
                  <Star size={11} fill="#fbbf24" color="#fbbf24" /> Popular
                </span>
              )}
            </div>

            <div className="card-details">
              <div className="title-row">
                <h3>{item.name}</h3>
                <span className="price">${item.price.toFixed(2)}</span>
              </div>

              {item.description && (
                <p className="desc">{item.description}</p>
              )}

              <div className="footer-row">
                <div className="tags">
                  {item.isVegetarian && (
                    <span className="tag veg"><Leaf size={12} /> Veg</span>
                  )}
                  {item.isSpicy && (
                    <span className="tag spicy"><Flame size={12} /> Spicy</span>
                  )}
                </div>

                {item.isAvailable ? (
                  <button
                    className="add-to-order-btn"
                    onClick={() => addToCart(item.id)}
                  >
                    {cart[item.id] ? (
                      <>
                        <Check size={14} /> Added ({cart[item.id]})
                      </>
                    ) : (
                      '+ Add to Order'
                    )}
                  </button>
                ) : (
                  <span className="sold-out-tag">Sold Out</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Tray (Mobile & Laptop) */}
      {totalCartCount > 0 && (
        <div className="cart-tray glass-panel">
          <div className="cart-info">
            <ShoppingBag size={20} color="#6366f1" />
            <span>
              <strong>{totalCartCount} item{totalCartCount > 1 ? 's' : ''}</strong> selected
            </span>
          </div>
          <div className="cart-actions">
            <span className="cart-total">Total: ${totalCartPrice.toFixed(2)}</span>
            <button
              className="btn-primary"
              onClick={() => alert(`Simulated Order Total: $${totalCartPrice.toFixed(2)}`)}
            >
              Simulate Order
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .customer-menu-container {
          padding-bottom: 90px;
        }

        .restaurant-banner {
          text-align: center;
          padding: 32px 20px;
          border-radius: var(--radius-xl);
          margin-bottom: 24px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%);
        }

        .live-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #818cf8;
          letter-spacing: 1px;
          background: rgba(99, 102, 241, 0.2);
          padding: 4px 10px;
          border-radius: 12px;
          display: inline-block;
          margin-bottom: 8px;
        }

        .restaurant-banner h1 {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 6px;
        }

        .restaurant-banner p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .customer-categories {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 16px;
          margin-bottom: 20px;
        }

        .cat-pill {
          padding: 8px 18px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .cat-pill.active {
          background: #6366f1;
          color: #ffffff;
          border-color: #6366f1;
        }

        .customer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .customer-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .customer-card.sold-out {
          opacity: 0.6;
        }

        .card-img-box {
          position: relative;
          height: 160px;
        }

        .card-img-box .img {
          object-fit: cover;
        }

        .badge-star {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(17, 24, 39, 0.85);
          color: #fbbf24;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .card-details {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 6px;
        }

        .title-row h3 {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .title-row .price {
          font-size: 1.15rem;
          font-weight: 800;
          color: #34d399;
        }

        .desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: 16px;
          flex: 1;
        }

        .footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
        }

        .tags {
          display: flex;
          gap: 6px;
        }

        .tag {
          font-size: 0.72rem;
          padding: 2px 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 3px;
          font-weight: 600;
        }
        .tag.veg { background: rgba(16, 185, 129, 0.15); color: #34d399; }
        .tag.spicy { background: rgba(239, 68, 68, 0.15); color: #f87171; }

        .add-to-order-btn {
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
          border: 1px solid rgba(99, 102, 241, 0.4);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .add-to-order-btn:hover {
          background: #6366f1;
          color: #ffffff;
        }

        .sold-out-tag {
          color: #f87171;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .cart-tray {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 48px);
          max-width: 600px;
          padding: 12px 20px;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 100;
        }

        .cart-info {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
        }

        .cart-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cart-total {
          font-size: 1.1rem;
          font-weight: 800;
          color: #34d399;
        }
      `}</style>
    </div>
  );
};
