'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import GlassCard from '../ui/GlassCard';
import Image from 'next/image';
import { useState } from 'react';

export default function CartDrawer() {
  const { 
    isOpen, 
    toggleCart, 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart,
    getTotalPrice,
    getTotalItems 
  } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      toggleCart();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50"
          >
            <GlassCard className="h-full rounded-none rounded-l-2xl flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="text-purple-400" size={24} />
                    <div>
                      <h2 className="text-xl font-bold">Your Cart</h2>
                      <p className="text-sm text-gray-400">
                        {getTotalItems()} items
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleCart}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <ShoppingBag size={64} className="text-gray-400 mb-4" />
                    <p className="text-gray-400 text-lg">Your cart is empty</p>
                    <button
                      onClick={toggleCart}
                      className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center space-x-4 p-4 rounded-xl bg-white/5"
                      >
                        {/* Product Image */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
                          <Image
                            src={item.product.image_url || '/placeholder-product.jpg'}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.product.name}</h3>
                          <p className="text-sm text-gray-400">
                            ${item.product.price.toFixed(2)}
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 rounded-full hover:bg-white/10"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 rounded-full hover:bg-white/10"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className="font-bold">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="p-1 text-red-400 hover:text-red-300"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-400">Total</span>
                    <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  
                  <button
                    onClick={clearCart}
                    className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Clear Cart
                  </button>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Processing...
                      </span>
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </button>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}