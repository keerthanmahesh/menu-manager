'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Edit3,
  Trash2,
  Check,
  X,
  Plus,
  Minus,
  Star,
  Flame,
  Leaf,
  Power,
  DollarSign
} from 'lucide-react';
import { MenuItem } from '@/types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onUpdatePrice: (id: string, newPrice: number) => Promise<boolean>;
  onToggleAvailability: (id: string, isAvailable: boolean) => Promise<void>;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  isCustomerView?: boolean;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onUpdatePrice,
  onToggleAvailability,
  onEdit,
  onDelete,
  isCustomerView = false,
}) => {
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [tempPrice, setTempPrice] = useState<string>(item.price.toFixed(2));
  const [isSavingPrice, setIsSavingPrice] = useState(false);

  const handleSavePrice = async () => {
    const num = parseFloat(tempPrice);
    if (isNaN(num) || num < 0) return;
    setIsSavingPrice(true);
    const success = await onUpdatePrice(item.id, num);
    setIsSavingPrice(false);
    if (success) {
      setIsEditingPrice(false);
    }
  };

  const handleQuickAdjust = async (amount: number) => {
    const newPrice = Math.max(0, parseFloat((item.price + amount).toFixed(2)));
    setTempPrice(newPrice.toFixed(2));
    await onUpdatePrice(item.id, newPrice);
  };

  return (
    <div className={`menu-card glass-card ${!item.isAvailable ? 'sold-out' : ''}`}>
      {/* Card Header Image */}
      <div className="card-image-wrapper">
        <Image
          src={
            item.imageUrl ||
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'
          }
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="card-image"
        />
        <div className="image-overlay" />

        {/* Top Badges */}
        <div className="badge-row top-left">
          {item.isPopular && (
            <span className="badge badge-popular" title="Chef's Special / Popular">
              <Star size={12} fill="#fbbf24" color="#fbbf24" /> Popular
            </span>
          )}
        </div>

        <div className="badge-row top-right">
          {item.isVegetarian && (
            <span className="badge badge-veg" title="Vegetarian">
              <Leaf size={12} /> Veg
            </span>
          )}
          {item.isSpicy && (
            <span className="badge badge-spicy" title="Spicy">
              <Flame size={12} /> Spicy
            </span>
          )}
        </div>

        {/* Availability Status Tag */}
        {!item.isAvailable && (
          <div className="sold-out-overlay">
            <span>SOLD OUT</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div className="category-tag">{item.category}</div>
        <h3 className="item-title">{item.name}</h3>

        {item.description && (
          <p className="item-description">{item.description}</p>
        )}

        {/* Price & Action Section */}
        <div className="price-section">
          {!isCustomerView ? (
            <div className="manager-price-control">
              <span className="price-label">Price:</span>

              {isEditingPrice ? (
                <div className="price-edit-box">
                  <span className="currency-symbol">$</span>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    value={tempPrice}
                    onChange={(e) => setTempPrice(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSavePrice();
                      if (e.key === 'Escape') setIsEditingPrice(false);
                    }}
                    autoFocus
                    className="price-input"
                  />
                  <button
                    className="btn-save-price"
                    onClick={handleSavePrice}
                    disabled={isSavingPrice}
                    title="Save Price"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    className="btn-cancel-price"
                    onClick={() => {
                      setTempPrice(item.price.toFixed(2));
                      setIsEditingPrice(false);
                    }}
                    title="Cancel"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="price-display-wrapper">
                  <span
                    className="price-amount"
                    onClick={() => {
                      setTempPrice(item.price.toFixed(2));
                      setIsEditingPrice(true);
                    }}
                    title="Click to edit price"
                  >
                    ${item.price.toFixed(2)}
                  </span>
                  
                  {/* Stepper Buttons for Mobile & Laptop quick adjustment */}
                  <div className="stepper-group">
                    <button
                      className="stepper-btn"
                      onClick={() => handleQuickAdjust(-0.5)}
                      title="Decrease by $0.50"
                    >
                      <Minus size={12} />
                    </button>
                    <button
                      className="stepper-btn"
                      onClick={() => handleQuickAdjust(0.5)}
                      title="Increase by $0.50"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="customer-price-display">
              <span className="price-amount">${item.price.toFixed(2)}</span>
            </div>
          )}

          {/* Action Tools (Admin Mode) */}
          {!isCustomerView && (
            <div className="card-actions">
              {/* Toggle Stock */}
              <button
                className={`stock-toggle-btn ${item.isAvailable ? 'available' : 'unavailable'}`}
                onClick={() => onToggleAvailability(item.id, !item.isAvailable)}
                title={item.isAvailable ? 'Mark as Sold Out' : 'Mark as Available'}
              >
                <Power size={14} />
                <span>{item.isAvailable ? 'In Stock' : 'Out'}</span>
              </button>

              {/* Edit full details */}
              <button
                className="action-btn edit-btn"
                onClick={() => onEdit(item)}
                title="Edit item details"
              >
                <Edit3 size={15} />
              </button>

              {/* Delete item */}
              <button
                className="action-btn delete-btn"
                onClick={() => onDelete(item.id)}
                title="Delete item"
              >
                <Trash2 size={15} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .menu-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .menu-card.sold-out {
          opacity: 0.78;
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
        }

        .card-image {
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .menu-card:hover .card-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(17, 24, 39, 0.9) 0%, transparent 60%);
        }

        .badge-row {
          position: absolute;
          top: 10px;
          display: flex;
          gap: 6px;
          z-index: 2;
        }
        .top-left { left: 10px; }
        .top-right { right: 10px; }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 600;
          backdrop-filter: blur(8px);
        }

        .badge-veg {
          background: var(--badge-veg-bg);
          color: var(--badge-veg-color);
          border: 1px solid rgba(52, 211, 153, 0.3);
        }

        .badge-spicy {
          background: var(--badge-spicy-bg);
          color: var(--badge-spicy-color);
          border: 1px solid rgba(248, 113, 113, 0.3);
        }

        .badge-popular {
          background: var(--badge-pop-bg);
          color: var(--badge-pop-color);
          border: 1px solid rgba(251, 191, 36, 0.3);
        }

        .sold-out-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
        }
        .sold-out-overlay span {
          background: #ef4444;
          color: #ffffff;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 6px 16px;
          border-radius: 6px;
          font-size: 0.85rem;
        }

        .card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .category-tag {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #818cf8;
          margin-bottom: 4px;
        }

        .item-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .item-description {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        .price-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
          gap: 8px;
        }

        .manager-price-control {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .price-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .price-display-wrapper {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .price-amount {
          font-size: 1.2rem;
          font-weight: 800;
          color: #34d399;
          cursor: pointer;
          padding: 2px 6px;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .price-amount:hover {
          background: rgba(52, 211, 153, 0.15);
          text-decoration: underline;
        }

        .stepper-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stepper-btn {
          width: 20px;
          height: 16px;
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          border-radius: 3px;
          padding: 0;
        }

        .stepper-btn:hover {
          background: rgba(99, 102, 241, 0.5);
          color: #ffffff;
        }

        .price-edit-box {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-input);
          padding: 2px 4px;
          border-radius: 6px;
          border: 1px solid var(--accent-primary);
        }

        .currency-symbol {
          color: #34d399;
          font-weight: 700;
          font-size: 0.9rem;
          padding-left: 4px;
        }

        .price-input {
          width: 65px;
          padding: 2px 4px;
          font-size: 0.95rem;
          font-weight: 700;
          border: none;
          background: transparent;
          color: #ffffff;
        }

        .btn-save-price {
          background: #10b981;
          color: white;
          width: 26px;
          height: 26px;
          border-radius: 4px;
          padding: 0;
        }

        .btn-cancel-price {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          width: 26px;
          height: 26px;
          border-radius: 4px;
          padding: 0;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .stock-toggle-btn {
          padding: 4px 8px;
          font-size: 0.72rem;
          border-radius: 6px;
          font-weight: 600;
          gap: 4px;
        }

        .stock-toggle-btn.available {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.3);
        }

        .stock-toggle-btn.unavailable {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.3);
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          padding: 0;
        }

        .edit-btn:hover {
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
          border-color: #818cf8;
        }

        .delete-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
          border-color: #f87171;
        }
      `}</style>
    </div>
  );
};
