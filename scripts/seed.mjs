import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleItems = [
  {
    name: "Artisanal Truffle Burger",
    description: "Dry-aged beef patty, black truffle aioli, aged Gruyère cheese, caramelized onions on a brioche bun.",
    price: 18.99,
    category: "Main Course",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: true,
    isVegetarian: false,
    isSpicy: false,
  },
  {
    name: "Wild Mushroom Risotto",
    description: "Arborio rice, porcini & chanterelle mushrooms, white wine, truffle oil, and shaved Parmigiano Reggiano.",
    price: 21.50,
    category: "Main Course",
    imageUrl: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: false,
    isVegetarian: true,
    isSpicy: false,
  },
  {
    name: "Spicy Dragon Sushi Roll",
    description: "Tempura shrimp, avocado, cucumber topped with spicy tuna, eel sauce, and microgreens.",
    price: 16.75,
    category: "Specials",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: true,
    isVegetarian: false,
    isSpicy: true,
  },
  {
    name: "Crispy Calamari Fritti",
    description: "Tender calamari rings, pickled peppers, served with roasted garlic garlic aioli & spicy marinara sauce.",
    price: 14.25,
    category: "Appetizers",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: false,
    isVegetarian: false,
    isSpicy: false,
  },
  {
    name: "Avocado Burrata Crostini",
    description: "Grilled sourdough bread, creamy Italian burrata, fresh avocado smash, cherry tomatoes, heirloom balsamic glaze.",
    price: 13.50,
    category: "Appetizers",
    imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
  },
  {
    name: "Matcha Lava Cake",
    description: "Warm Japanese green tea molten cake served with Madagascar vanilla bean gelato and berry coulis.",
    price: 9.99,
    category: "Desserts",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
  },
  {
    name: "Classic Tiramisu",
    description: "Traditional espresso-soaked ladyfingers, mascarpone cream, dark cocoa dust.",
    price: 8.50,
    category: "Desserts",
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: false,
    isVegetarian: true,
    isSpicy: false,
  },
  {
    name: "Smoked Hibiscus Cold Brew",
    description: "Artisanal cold-extracted coffee infused with wild hibiscus syrup, citrus zest, and cinnamon bark.",
    price: 6.25,
    category: "Beverages",
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
  },
  {
    name: "Yuzu Sparkling Tonic",
    description: "Japanese Yuzu citrus juice, fresh mint, organic agave, sparkling mineral water.",
    price: 5.75,
    category: "Beverages",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    isPopular: false,
    isVegetarian: true,
    isSpicy: false,
  }
];

async function main() {
  console.log('🌱 Starting database seed...');
  await prisma.menuItem.deleteMany();

  for (const item of sampleItems) {
    const created = await prisma.menuItem.create({
      data: item,
    });
    console.log(`Created: ${created.name} ($${created.price})`);
  }
  console.log('✅ Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
