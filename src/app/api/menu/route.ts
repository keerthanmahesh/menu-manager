import { NextResponse } from 'next/server';
import { getMenuItems, addMenuItem } from '@/lib/mockData';

// GET /api/menu - List items from memory
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const items = getMenuItems(category, search);

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    console.error('Failed to fetch menu items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

// POST /api/menu - Add item to memory
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      category,
      imageUrl,
      isAvailable,
      isVegetarian,
      isSpicy,
      isPopular,
    } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Item name is required' },
        { status: 400 }
      );
    }

    if (price === undefined || price === null || isNaN(Number(price)) || Number(price) < 0) {
      return NextResponse.json(
        { success: false, error: 'Valid positive price is required' },
        { status: 400 }
      );
    }

    if (!category || category.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Category is required' },
        { status: 400 }
      );
    }

    const newItem = addMenuItem({
      name: name.trim(),
      description: description ? description.trim() : '',
      price: parseFloat(Number(price).toFixed(2)),
      category: category.trim(),
      imageUrl: imageUrl && imageUrl.trim() !== '' ? imageUrl.trim() : undefined,
      isAvailable: isAvailable ?? true,
      isVegetarian: Boolean(isVegetarian),
      isSpicy: Boolean(isSpicy),
      isPopular: Boolean(isPopular),
    });

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
}
