'use client';

import React from 'react';
import { Utensils, CheckCircle, DollarSign, Layers } from 'lucide-react';
import { MenuItem } from '@/types/menu';

interface StatsBannerProps {
  items: MenuItem[];
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ items }) => {
  const totalItems = items.length;
  const activeItems = items.filter((i) => i.isAvailable).length;
  const avgPrice = totalItems > 0
    ? (items.reduce((sum, i) => sum + i.price, 0) / totalItems).toFixed(2)
    : '0.00';
  const categoriesCount = new Set(items.map((i) => i.category)).size;

  return (
    <div className="stats-banner glass-panel">
      <div className="stat-card">
        <div className="stat-icon icon-indigo">
          <Utensils size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{totalItems}</span>
          <span className="stat-label">Total Items</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-emerald">
          <CheckCircle size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{activeItems}</span>
          <span className="stat-label">In Stock & Active</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-amber">
          <DollarSign size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">${avgPrice}</span>
          <span className="stat-label">Average Dish Price</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-purple">
          <Layers size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{categoriesCount}</span>
          <span className="stat-label">Active Categories</span>
        </div>
      </div>

      <style jsx>{`
        .stats-banner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          padding: 16px 20px;
          border-radius: var(--radius-lg);
          margin-bottom: 24px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-indigo {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
        }

        .icon-emerald {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
        }

        .icon-amber {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
        }

        .icon-purple {
          background: rgba(168, 85, 247, 0.15);
          color: #c084fc;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .stats-banner {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 500px) {
          .stats-banner {
            grid-template-columns: repeat(2, 1fr);
            padding: 12px;
            gap: 10px;
          }
          .stat-icon {
            width: 36px;
            height: 36px;
          }
          .stat-value {
            font-size: 1.15rem;
          }
          .stat-label {
            font-size: 0.72rem;
          }
        }
      `}</style>
    </div>
  );
};
