import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/menu - List items with optional search & category filter
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = {};

    if (category && category !== 'All') {
      where.category = category;
    }

    if (search && search.trim() !== '') {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const items = await prisma.menuItem.findMany({
      where,
      orderBy: [
        { isPopular: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    console.error('Failed to fetch menu items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

// POST /api/menu - Add a new menu item
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

    // Basic Validation
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

    const newItem = await prisma.menuItem.create({
      data: {
        name: name.trim(),
        description: description ? description.trim() : '',
        price: parseFloat(Number(price).toFixed(2)),
        category: category.trim(),
        imageUrl: imageUrl && imageUrl.trim() !== '' 
          ? imageUrl.trim() 
          : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
        isAvailable: isAvailable ?? true,
        isVegetarian: Boolean(isVegetarian),
        isSpicy: Boolean(isSpicy),
        isPopular: Boolean(isPopular),
      },
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
