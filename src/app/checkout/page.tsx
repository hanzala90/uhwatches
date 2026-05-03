'use client';

import React, { useState } from 'react';
import { useWatchStore } from '@/store/useWatchStore';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/appwrite';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const watchStore = useWatchStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Pakistan',
    city: '',
    addressLine1: '',
    stateProvince: '',
    postalCode: '',
    paymentMethod: 'whatsapp',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const depositAmount = 500; // 500 PKR for the deposit

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        addressLine1: formData.addressLine1,
        stateProvince: formData.stateProvince,
        postalCode: formData.postalCode,
        country: formData.country,
        status: 'pending',
        configuration: JSON.stringify({
           baseModel: watchStore.baseModel,
           caseShape: watchStore.caseShape,
           designOptions: watchStore.designOptions,
           structuralOptions: watchStore.structuralOptions
        }),
        paymentReference: formData.paymentMethod,
        engravingText: watchStore.engraving?.text || undefined,
        engravingFont: watchStore.engraving?.font || undefined,
        uploadedArtworkUrl: watchStore.uploadedImage || undefined,
        totalAmount: watchStore.totalPrice,
        depositAmount: formData.paymentMethod === 'whatsapp' ? '500' : '0',
        whatsappNumber: formData.paymentMethod === 'whatsapp' ? formData.phone : undefined,
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong while submitting the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col pt-24">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-xl w-full bg-[#111] border border-white/10 rounded-2xl p-12 text-center space-y-6 shadow-2xl">
            <div className="flex justify-center text-[#25D366]">
              <CheckCircle size={64} />
            </div>
            <h1 className="text-4xl font-light tracking-tight text-white">Order Received!</h1>
            <p className="text-white/60">
              Thank you for configuring your bespoke timepiece.
            </p>
            {formData.paymentMethod === 'whatsapp' ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                <p className="text-sm font-semibold uppercase tracking-wider text-white/80">Next Step: Security Deposit</p>
                <p className="text-sm text-white/60">
                  Please send your initial deposit of <strong className="text-white">PKR {depositAmount}</strong> via Bank Transfer/JazzCash/EasyPaisa to confirm your order slot.
                </p>
                <a 
                  href={`https://wa.me/923215865580?text=Hello%21%20I%20have%20placed%20an%20order%20for%20a%20custom%20watch%20under%20the%20name%20${encodeURIComponent(formData.name)}.%20Please%20share%20deposit%20details.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-[#25D366] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#20b858] transition-colors"
                >
                  Contact on WhatsApp
                </a>
              </div>
            ) : (
               <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-sm text-white/60">
                  Our team will contact you shortly to confirm your order details before delivery.
                </p>
              </div>
            )}
            <button 
              onClick={() => router.push('/')}
              className="text-white/50 hover:text-white transition-colors text-sm underline underline-offset-4 mt-6"
            >
              Return Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-12 flex flex-col font-sans">
      <div className="flex-1 max-w-7xl mx-auto w-full px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
        
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-light tracking-tight">Checkout</h1>
            <p className="text-white/50">Complete your details to secure your custom piece.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Country / Region</label>
                <select 
                  name="country" 
                  value={formData.country} 
                  onChange={handleInputChange} 
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] transition-colors text-white appearance-none"
                >
                  <option value="Pakistan">Pakistan</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="UK">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="Global">Other (Global)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] transition-colors" />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Address Line 1</label>
                <input required type="text" name="addressLine1" placeholder="House/Apartment #, Street..." value={formData.addressLine1} onChange={handleInputChange} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">City / Region</label>
                <input required type="text" name="city" placeholder="Islamabad, Lahore, Karachi..." value={formData.city} onChange={handleInputChange} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">State / Province</label>
                <input required type="text" name="stateProvince" placeholder="e.g. Punjab, Sindh..." value={formData.stateProvince} onChange={handleInputChange} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Postal / Zip Code</label>
                <input required type="text" name="postalCode" placeholder="e.g. 44000" value={formData.postalCode} onChange={handleInputChange} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] transition-colors" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Phone Number</label>
                <input required type="tel" name="phone" placeholder="e.g. 03001234567" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] transition-colors" />
              </div>

            </div>

            <div className="space-y-4 pt-4">
              <label className="text-xs uppercase tracking-widest text-white/60">Payment Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all ${formData.paymentMethod === 'whatsapp' ? 'bg-[#111] border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.2)]' : 'bg-transparent border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="paymentMethod" value="whatsapp" className="hidden" onChange={handleInputChange} checked={formData.paymentMethod === 'whatsapp'} />
                  <span className="font-semibold text-sm">WhatsApp Deposit</span>
                  <span className="text-xs text-white/50 text-center">Initial PKR 500 required, rest on delivery</span>
                </label>
                <label className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all ${formData.paymentMethod === 'cod' ? 'bg-[#111] border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.2)]' : 'bg-transparent border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="paymentMethod" value="cod" className="hidden" onChange={handleInputChange} checked={formData.paymentMethod === 'cod'} />
                  <span className="font-semibold text-sm">Cash on Delivery</span>
                  <span className="text-xs text-white/50 text-center">Pay exact full amount on doorstep</span>
                </label>
              </div>
            </div>

            {error && <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">{error}</div>}

            <div className="pt-8 flex justify-end">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-white text-black px-8 py-4 rounded-xl font-semibold shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center min-w-[200px]"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Confirm Order'}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-28 shadow-2xl">
            <h3 className="text-lg font-light tracking-tight text-white mb-6 uppercase">Order Summary</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-white/70">
                <span className="capitalize">{watchStore.caseShape} Case</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span className="capitalize">{watchStore.structuralOptions.movement} Movement</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span className="capitalize">{watchStore.baseModel} Strap</span>
                <span>Included</span>
              </div>
              {watchStore.engraving.text && (
                <div className="flex justify-between text-white/70 pt-2 border-t border-white/10">
                  <span>Custom Engraving</span>
                  <span>+PKR 1,500</span>
                </div>
              )}
              {watchStore.uploadedImage && (
                <div className="flex justify-between text-white/70">
                  <span>Photo Customization</span>
                  <span>+PKR 1,000</span>
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between text-white">
                <span className="font-semibold text-lg">Total Price</span>
                <span className="font-light text-xl">PKR {watchStore.totalPrice.toLocaleString()}</span>
              </div>
              
              {formData.paymentMethod === 'whatsapp' && (
                <div className="flex justify-between text-[#C5A059] bg-[#C5A059]/10 p-3 rounded-lg border border-[#C5A059]/20">
                  <span className="font-medium text-sm">Advance Deposit Required</span>
                  <span className="font-bold text-sm">PKR 500</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
