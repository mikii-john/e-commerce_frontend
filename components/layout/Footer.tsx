'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

export default function Footer() {
  const links = {
    shop: ['New Arrivals', 'Best Sellers', 'Discount', 'Accessories'],
    company: ['About Us', 'Careers', 'Press', 'Blog'],
    support: ['Contact Us', 'Returns', 'FAQ', 'Privacy Policy'],
  };

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              LuxeShop
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the future of premium shopping. We bring you curated luxury items with exceptional quality and design.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, color: '#d8b4fe' }}
                  className="text-gray-400 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4 capitalize">{title}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter (Visual Only) */}
          {/* <div className="lg:col-span-1">
             Newsletter code if needed later
          </div> */}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} LuxeShop. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gray-300">Terms</Link>
            <Link href="#" className="hover:text-gray-300">Privacy</Link>
            <Link href="#" className="hover:text-gray-300">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
