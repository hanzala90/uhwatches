'use client';

import React, { useEffect, useState } from 'react';

interface Order {
  id: string;
  totalPrice: number;
  baseModel: string;
  timestamp: string;
  engraving: { text: string; font: string };
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data.orders || []));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-12">
      <div className="flex justify-between items-center mb-8 bg-[#111] p-6 rounded-2xl border border-white/5">
         <h1 className="text-3xl tracking-widest font-light">ADMIN DASHBOARD</h1>
         <a href="/" className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors tracking-wide text-sm font-medium">← Back to Store</a>
      </div>
      <table className="w-full text-left bg-[#111] rounded-2xl overflow-hidden border border-white/5 text-sm">
        <thead>
          <tr className="border-b border-white/5">
            <th className="p-4 uppercase tracking-wider text-xs text-white/50">Order ID</th>
            <th className="p-4 uppercase tracking-wider text-xs text-white/50">Model</th>
            <th className="p-4 uppercase tracking-wider text-xs text-white/50">Price</th>
            <th className="p-4 uppercase tracking-wider text-xs text-white/50">Engraving</th>
            <th className="p-4 uppercase tracking-wider text-xs text-white/50">Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
             <tr key={o.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono text-[#C5A059]">{o.id}</td>
                <td className="p-4 capitalize opacity-80">{o.baseModel}</td>
                <td className="p-4 font-semibold">${o.totalPrice}</td>
                <td className="p-4">
                  {o.engraving?.text ? (
                    <span className="italic">"{o.engraving.text}" ({o.engraving.font})</span>
                  ) : <span className="text-white/20">-</span>}
                </td>
                <td className="p-4 text-xs text-white/40">{new Date(o.timestamp).toLocaleString()}</td>
             </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={5} className="p-8 text-center text-white/30 text-sm">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
