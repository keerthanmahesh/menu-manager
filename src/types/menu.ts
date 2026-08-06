export interface MenuItem {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  imageUrl?: string | null;
  isAvailable: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
  isPopular: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CategoryOption = 'All' | 'Appetizers' | 'Main Course' | 'Desserts' | 'Beverages' | 'Specials';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
