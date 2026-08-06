'use client';

import React from 'react';
import { ChefHat, Plus, Eye, Settings } from 'lucide-react';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenAddModal: () => void;
  isCustomerView: boolean;
  onToggleViewMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  onSearchChange,
  onOpenAddModal,
  isCustomerView,
  onToggleViewMode,
}) => {
  return (
    <header className="navbar glass-panel">
      <div className="nav-container">
        {/* Top Header Row (Brand Logo + Action Controls) */}
        <div className="nav-top-row">
          <div className="nav-brand">
            <div className="brand-logo">
              <ChefHat size={22} color="#818cf8" />
            </div>
            <div className="brand-text">
              <span className="brand-title">MenuCraft</span>
              <span className="brand-subtitle">Smart Price & Dish Manager</span>
            </div>
          </div>

          <div className="nav-controls">
            {/* View Mode Toggle */}
            <button
              className={`toggle-view-btn ${isCustomerView ? 'active-customer' : ''}`}
              onClick={onToggleViewMode}
              title={isCustomerView ? 'Switch to Manager Mode' : 'Preview Customer Digital Menu'}
            >
              {isCustomerView ? (
                <>
                  <Settings size={15} />
                  <span>Manager Mode</span>
                </>
              ) : (
                <>
                  <Eye size={15} />
                  <span>Customer View</span>
                </>
              )}
            </button>

            {/* Desktop Add Item Button */}
            {!isCustomerView && (
              <button className="btn-primary desktop-add-btn" onClick={onOpenAddModal}>
                <Plus size={18} />
                <span>Add Dish</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Search Row (Full width on mobile, centered on desktop) */}
        {!isCustomerView && (
          <div className="search-box">
            <input
              type="text"
              placeholder="Search dishes, ingredients, categories..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
        )}
      </div>

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 20px;
        }

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .nav-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-logo {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background: rgba(99, 102, 241, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.3px;
        }

        .brand-subtitle {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .search-box {
          flex: 1;
          max-width: 420px;
        }

        .search-input {
          width: 100%;
          padding: 0 16px;
          background: rgba(31, 41, 55, 0.7);
          border-radius: var(--radius-xl);
          height: 38px;
          font-size: 0.88rem;
          border: 1px solid var(--border-color);
        }

        .nav-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .toggle-view-btn {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 7px 12px;
          font-size: 0.82rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .toggle-view-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .toggle-view-btn.active-customer {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border-color: rgba(52, 211, 153, 0.4);
        }

        /* Mobile specific layout */
        @media (max-width: 768px) {
          .nav-container {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 10px 14px;
          }

          .nav-top-row {
            width: 100%;
          }

          .brand-subtitle {
            display: none;
          }

          .search-box {
            max-width: 100%;
            width: 100%;
          }

          .desktop-add-btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
