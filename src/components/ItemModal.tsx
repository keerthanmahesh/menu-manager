'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, Check, Leaf, Flame, Star } from 'lucide-react';
import { MenuItem } from '@/types/menu';

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemData: Partial<MenuItem>) => Promise<boolean>;
  initialItem?: MenuItem | null;
  categories: string[];
}

const PRESET_IMAGES = [
  { name: 'Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80' },
  { name: 'Pizza', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80' },
  { name: 'Sushi', url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80' },
  { name: 'Pasta / Risotto', url: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&auto=format&fit=crop&q=80' },
  { name: 'Appetizer', url: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&auto=format&fit=crop&q=80' },
  { name: 'Dessert', url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80' },
  { name: 'Drink / Coffee', url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80' },
  { name: 'Cocktail / Mocktail', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80' },
];

export const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItem,
  categories,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categories[1] || 'Main Course');
  const [imageUrl, setImageUrl] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name || '');
      setDescription(initialItem.description || '');
      setPrice(initialItem.price.toString());
      setCategory(initialItem.category || categories[1] || 'Main Course');
      setImageUrl(initialItem.imageUrl || '');
      setIsAvailable(initialItem.isAvailable ?? true);
      setIsVegetarian(initialItem.isVegetarian ?? false);
      setIsSpicy(initialItem.isSpicy ?? false);
      setIsPopular(initialItem.isPopular ?? false);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setCategory(categories[1] || 'Main Course');
      setImageUrl(PRESET_IMAGES[0].url);
      setIsAvailable(true);
      setIsVegetarian(false);
      setIsSpicy(false);
      setIsPopular(false);
    }
    setErrorMsg('');
  }, [initialItem, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter an item name.');
      return;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice < 0) {
      setErrorMsg('Please enter a valid price ($0.00 or higher).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const success = await onSave({
      name,
      description,
      price: numPrice,
      category,
      imageUrl: imageUrl.trim() || PRESET_IMAGES[0].url,
      isAvailable,
      isVegetarian,
      isSpicy,
      isPopular,
    });

    setIsSubmitting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel animate-fade-in">
        <div className="modal-header">
          <h2>{initialItem ? '✏️ Edit Menu Item' : '✨ Add New Menu Item'}</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {errorMsg && <div className="error-banner">{errorMsg}</div>}

          <div className="form-group">
            <label>Item Name *</label>
            <input
              type="text"
              placeholder="e.g. Artisanal Truffle Burger"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories
                  .filter((cat) => cat !== 'All')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group flex-1">
              <label>Price ($ USD) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="14.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows={3}
              placeholder="Brief description of ingredients, flavor notes, and preparation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Image Selection with Presets */}
          <div className="form-group">
            <label>Dish Photo</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            
            <div className="preset-label">Or choose a preset photo:</div>
            <div className="preset-grid">
              {PRESET_IMAGES.map((preset) => (
                <button
                  type="button"
                  key={preset.name}
                  className={`preset-btn ${imageUrl === preset.url ? 'selected' : ''}`}
                  onClick={() => setImageUrl(preset.url)}
                >
                  <img src={preset.url} alt={preset.name} />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Badges and Toggles */}
          <div className="toggles-section">
            <label className="toggle-chip">
              <input
                type="checkbox"
                checked={isVegetarian}
                onChange={(e) => setIsVegetarian(e.target.checked)}
              />
              <Leaf size={16} color="#34d399" /> Vegetarian
            </label>

            <label className="toggle-chip">
              <input
                type="checkbox"
                checked={isSpicy}
                onChange={(e) => setIsSpicy(e.target.checked)}
              />
              <Flame size={16} color="#f87171" /> Spicy
            </label>

            <label className="toggle-chip">
              <input
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
              />
              <Star size={16} color="#fbbf24" /> Chef's Special
            </label>

            <label className="toggle-chip">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              />
              <Check size={16} color="#60a5fa" /> In Stock & Ready
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : initialItem ? 'Update Item' : 'Add Item to Menu'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .modal-content {
          width: 100%;
          max-width: 580px;
          border-radius: var(--radius-xl);
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .modal-form {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .error-banner {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          color: #f87171;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 0.88rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .form-row {
          display: flex;
          gap: 16px;
        }

        .flex-1 { flex: 1; }

        .preset-label {
          font-size: 0.78rem;
          color: var(--text-dim);
          margin-top: 8px;
          margin-bottom: 4px;
        }

        .preset-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        .preset-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 4px;
          overflow: hidden;
          transition: all 0.2s;
        }

        .preset-btn img {
          width: 100%;
          height: 48px;
          object-fit: cover;
          border-radius: 4px;
        }

        .preset-btn span {
          font-size: 0.68rem;
          color: var(--text-muted);
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .preset-btn.selected {
          border-color: #6366f1;
          background: rgba(99, 102, 241, 0.2);
        }

        .toggles-section {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 8px;
        }

        .toggle-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          cursor: pointer;
          user-select: none;
        }

        .toggle-chip input {
          accent-color: #6366f1;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 12px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
        }

        @media (max-width: 640px) {
          .preset-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .form-row {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
};
