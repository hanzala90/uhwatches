import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'orders.json');
    
    let currentOrders = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      currentOrders = JSON.parse(fileContent);
    } catch (err) {
      currentOrders = [];
    }

    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      ...data
    };

    currentOrders.push(newOrder);
    await fs.writeFile(filePath, JSON.stringify(currentOrders, null, 2));

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'orders.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const orders = JSON.parse(fileContent);
    return NextResponse.json({ orders });
  } catch (err) {
    return NextResponse.json({ orders: [] });
  }
}
