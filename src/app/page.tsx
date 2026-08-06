'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { StatsBanner } from '@/components/StatsBanner';
import { CategoryTabs } from '@/components/CategoryTabs';
import { MenuItemCard } from '@/components/MenuItemCard';
import { ItemModal } from '@/components/ItemModal';
import { ToastContainer } from '@/components/Toast';
import { CustomerView } from '@/components/CustomerView';
import { MenuItem, CategoryOption, ToastMessage } from '@/types/menu';
import { Plus, Utensils, RefreshCw, AlertCircle } from 'lucide-react';

const CATEGORIES: CategoryOption[] = [
  'All',
  'Appetizers',
  'Main Course',
  'Desserts',
  'Beverages',
  'Specials',
];

export default function Home() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<CategoryOption>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCustomerView, setIsCustomerView] = useState<boolean>(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const newToast: ToastMessage = {
      id: Date.now().toString(),
      type,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch Menu Items from Database API
  const fetchMenuItems = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/menu');
      const data = await res.json();

      if (data.success) {
        setItems(data.data);
      } else {
        setError(data.error || 'Failed to load menu items');
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError('Could not connect to database server.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  // Update Price Handler
  const handleUpdatePrice = async (id: string, newPrice: number): Promise<boolean> => {
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: newPrice }),
      });
      const data = await res.json();

      if (data.success) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, price: newPrice } : item))
        );
        addToast('success', `Price updated to $${newPrice.toFixed(2)}`);
        return true;
      } else {
        addToast('error', data.error || 'Failed to update price');
        return false;
      }
    } catch (err) {
      addToast('error', 'Network error while updating price');
      return false;
    }
  };

  // Toggle Availability Handler
  const handleToggleAvailability = async (id: string, isAvailable: boolean) => {
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable }),
      });
      const data = await res.json();

      if (data.success) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, isAvailable } : item))
        );
        addToast(
          'info',
          isAvailable ? 'Item marked as In Stock' : 'Item marked as Sold Out'
        );
      } else {
        addToast('error', data.error || 'Failed to update status');
      }
    } catch (err) {
      addToast('error', 'Network error while updating availability');
    }
  };

  // Save Item (Create or Update full details)
  const handleSaveItem = async (itemData: Partial<MenuItem>): Promise<boolean> => {
    try {
      const isEdit = Boolean(editingItem);
      const url = isEdit ? `/api/menu/${editingItem?.id}` : '/api/menu';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
      const data = await res.json();

      if (data.success) {
        if (isEdit) {
          setItems((prev) =>
            prev.map((item) => (item.id === editingItem?.id ? data.data : item))
          );
          addToast('success', `Updated "${itemData.name}"`);
        } else {
          setItems((prev) => [data.data, ...prev]);
          addToast('success', `Added "${itemData.name}" to menu`);
        }
        return true;
      } else {
        addToast('error', data.error || 'Failed to save menu item');
        return false;
      }
    } catch (err) {
      addToast('error', 'Network error while saving item');
      return false;
    }
  };

  // Delete Item Handler
  const handleDeleteItem = async (id: string) => {
    const itemToDelete = items.find((i) => i.id === id);
    if (!confirm(`Are you sure you want to delete "${itemToDelete?.name || 'this item'}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setItems((prev) => prev.filter((i) => i.id !== id));
        addToast('info', `Deleted "${itemToDelete?.name || 'item'}"`);
      } else {
        addToast('error', data.error || 'Failed to delete item');
      }
    } catch (err) {
      addToast('error', 'Network error while deleting item');
    }
  };

  // Category counts calculation
  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Filtered menu items for view
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-shell">
      {/* Top Navbar */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenAddModal={() => {
          setEditingItem(null);
          setIsModalOpen(true);
        }}
        isCustomerView={isCustomerView}
        onToggleViewMode={() => setIsCustomerView(!isCustomerView)}
      />

      <main className="main-content">
        {isCustomerView ? (
          <CustomerView items={items} categories={CATEGORIES} />
        ) : (
          <>
            {/* Stats Summary Banner */}
            <StatsBanner items={items} />

            {/* Category Tab Controls */}
            <CategoryTabs
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              counts={categoryCounts}
            />

            {/* Error or Loading States */}
            {isLoading ? (
              <div className="state-box">
                <RefreshCw size={32} className="spin-icon" color="#818cf8" />
                <p>Loading menu items from database...</p>
              </div>
            ) : error ? (
              <div className="state-box error-box">
                <AlertCircle size={32} color="#f87171" />
                <p>{error}</p>
                <button className="btn-secondary" onClick={fetchMenuItems}>
                  Retry Connection
                </button>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="state-box empty-box">
                <Utensils size={40} color="#6b7280" />
                <h3>No Menu Items Found</h3>
                <p>
                  {searchTerm
                    ? `No items matching "${searchTerm}"`
                    : `No items under category "${activeCategory}" yet.`}
                </p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setEditingItem(null);
                    setIsModalOpen(true);
                  }}
                >
                  <Plus size={18} /> Add First Item
                </button>
              </div>
            ) : (
              /* Menu Grid Layout */
              <div className="menu-grid">
                {filteredItems.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onUpdatePrice={handleUpdatePrice}
                    onToggleAvailability={handleToggleAvailability}
                    onEdit={(itm) => {
                      setEditingItem(itm);
                      setIsModalOpen(true);
                    }}
                    onDelete={handleDeleteItem}
                    isCustomerView={false}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Floating Action Button for Mobile quick addition */}
      {!isCustomerView && (
        <button
          className="mobile-fab"
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          title="Add New Dish"
        >
          <Plus size={24} />
        </button>
      )}

      {/* Modal Dialog */}
      <ItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        initialItem={editingItem}
        categories={CATEGORIES}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <style jsx>{`
        .app-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 0 20px 60px 20px;
          flex: 1;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .state-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
          gap: 16px;
          background: rgba(17, 24, 39, 0.4);
          border: 1px dashed var(--border-color);
          border-radius: var(--radius-xl);
          color: var(--text-muted);
        }

        .spin-icon {
          animation: spin 1.2s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        .mobile-fab {
          display: none;
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.5);
          z-index: 90;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .menu-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .mobile-fab {
            display: flex;
          }
          .main-content {
            padding-left: 12px;
            padding-right: 12px;
          }
        }
      `}</style>
    </div>
  );
}
