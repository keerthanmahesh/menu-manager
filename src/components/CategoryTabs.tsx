'use client';

import React from 'react';
import { CategoryOption } from '@/types/menu';

interface CategoryTabsProps {
  categories: CategoryOption[];
  activeCategory: CategoryOption;
  onSelectCategory: (cat: CategoryOption) => void;
  counts: Record<string, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  counts,
}) => {
  return (
    <div className="category-container">
      <div className="category-scroll">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const count = cat === 'All'
            ? Object.values(counts).reduce((a, b) => a + b, 0)
            : counts[cat] || 0;

          return (
            <button
              key={cat}
              className={`cat-tab ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              <span>{cat}</span>
              <span className={`cat-badge ${isActive ? 'badge-active' : ''}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .category-container {
          margin-bottom: 24px;
          overflow: hidden;
        }

        .category-scroll {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          padding: 4px 2px 10px 2px;
          scrollbar-width: thin;
        }

        .category-scroll::-webkit-scrollbar {
          height: 4px;
        }

        .cat-tab {
          background: rgba(31, 41, 55, 0.6);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          padding: 8px 16px;
          border-radius: var(--radius-xl);
          font-weight: 500;
          font-size: 0.9rem;
          white-space: nowrap;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cat-tab:hover {
          background: rgba(55, 65, 81, 0.8);
          color: var(--text-main);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .cat-tab.active {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: #ffffff;
          border-color: #6366f1;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
        }

        .cat-badge {
          background: rgba(255, 255, 255, 0.12);
          color: inherit;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .cat-tab.active .badge-active {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};
