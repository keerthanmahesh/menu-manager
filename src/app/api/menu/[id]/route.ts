import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH /api/menu/[id] - Update item (price, details, availability)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return NextResponse.json(
        { success: false, error: 'Menu item not found' },
        { status: 404 }
      );
    }

    const updateData: any = {};

    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.description !== undefined) updateData.description = body.description.trim();
    if (body.price !== undefined) {
      const numPrice = Number(body.price);
      if (isNaN(numPrice) || numPrice < 0) {
        return NextResponse.json(
          { success: false, error: 'Invalid price value' },
          { status: 400 }
        );
      }
      updateData.price = parseFloat(numPrice.toFixed(2));
    }
    if (body.category !== undefined) updateData.category = body.category.trim();
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl.trim();
    if (body.isAvailable !== undefined) updateData.isAvailable = Boolean(body.isAvailable);
    if (body.isVegetarian !== undefined) updateData.isVegetarian = Boolean(body.isVegetarian);
    if (body.isSpicy !== undefined) updateData.isSpicy = Boolean(body.isSpicy);
    if (body.isPopular !== undefined) updateData.isPopular = Boolean(body.isPopular);

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error: any) {
    console.error('Failed to update menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update menu item' },
      { status: 500 }
    );
  }
}

// DELETE /api/menu/[id] - Delete a menu item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return NextResponse.json(
        { success: false, error: 'Menu item not found' },
        { status: 404 }
      );
    }

    await prisma.menuItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Item deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}
