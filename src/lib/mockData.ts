import { MenuItem } from '@/types/menu';

export const initialMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Artisanal Truffle Burger",
    description: "Dry-aged beef patty, black truffle aioli, aged Gruyère cheese, caramelized onions on a brioche bun.",
    price: 18.99,
    category: "Main Course",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: true,
    isVegetarian: false,
    isSpicy: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Wild Mushroom Risotto",
    description: "Arborio rice, porcini & chanterelle mushrooms, white wine, truffle oil, and shaved Parmigiano Reggiano.",
    price: 21.50,
    category: "Main Course",
    imageUrl: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: false,
    isVegetarian: true,
    isSpicy: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Spicy Dragon Sushi Roll",
    description: "Tempura shrimp, avocado, cucumber topped with spicy tuna, eel sauce, and microgreens.",
    price: 16.75,
    category: "Specials",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: true,
    isVegetarian: false,
    isSpicy: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Crispy Calamari Fritti",
    description: "Tender calamari rings, pickled peppers, served with roasted garlic aioli & spicy marinara sauce.",
    price: 14.25,
    category: "Appetizers",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: false,
    isVegetarian: false,
    isSpicy: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Avocado Burrata Crostini",
    description: "Grilled sourdough bread, creamy Italian burrata, fresh avocado smash, cherry tomatoes, heirloom balsamic glaze.",
    price: 13.50,
    category: "Appetizers",
    imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Matcha Lava Cake",
    description: "Warm Japanese green tea molten cake served with Madagascar vanilla bean gelato and berry coulis.",
    price: 9.99,
    category: "Desserts",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Classic Tiramisu",
    description: "Traditional espresso-soaked ladyfingers, mascarpone cream, dark cocoa dust.",
    price: 8.50,
    category: "Desserts",
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: false,
    isVegetarian: true,
    isSpicy: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Smoked Hibiscus Cold Brew",
    description: "Artisanal cold-extracted coffee infused with wild hibiscus syrup, citrus zest, and cinnamon bark.",
    price: 6.25,
    category: "Beverages",
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Yuzu Sparkling Tonic",
    description: "Japanese Yuzu citrus juice, fresh mint, organic agave, sparkling mineral water.",
    price: 5.75,
    category: "Beverages",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: false,
    isVegetarian: true,
    isSpicy: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// In-memory array store for serverless API routes
let menuStore: MenuItem[] = [...initialMenuItems];

export function getMenuItems(category?: string | null, search?: string | null) {
  let items = [...menuStore];

  if (category && category !== 'All') {
    items = items.filter((i) => i.category === category);
  }

  if (search && search.trim() !== '') {
    const q = search.toLowerCase();
    items = items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        (i.description && i.description.toLowerCase().includes(q))
    );
  }

  return items;
}

export function addMenuItem(data: Partial<MenuItem>): MenuItem {
  const newItem: MenuItem = {
    id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
    name: data.name || 'Untitled Item',
    description: data.description || '',
    price: data.price || 0,
    category: data.category || 'Main Course',
    imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    isAvailable: data.isAvailable ?? true,
    isVegetarian: Boolean(data.isVegetarian),
    isSpicy: Boolean(data.isSpicy),
    isPopular: Boolean(data.isPopular),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  menuStore.unshift(newItem);
  return newItem;
}

export function updateMenuItem(id: string, data: Partial<MenuItem>): MenuItem | null {
  const index = menuStore.findIndex((i) => i.id === id);
  if (index === -1) return null;

  menuStore[index] = {
    ...menuStore[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return menuStore[index];
}

export function deleteMenuItem(id: string): boolean {
  const initialLength = menuStore.length;
  menuStore = menuStore.filter((i) => i.id !== id);
  return menuStore.length < initialLength;
}
