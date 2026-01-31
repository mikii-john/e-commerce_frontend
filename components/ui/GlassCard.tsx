'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ 
  children, 
  className = '', 
  hover = true 
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        backdrop-blur-lg
        bg-white/10 dark:bg-black/20
        border border-white/20 dark:border-white/10
        shadow-2xl
        rounded-2xl
        ${hover ? 'hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}