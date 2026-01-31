import { Product, Order } from '../types';
import { apiClient } from './client';

export const productApi = {
  getAll: () => apiClient<Product[]>('/api/products'),
  getById: (id: string) => apiClient<Product>(`/api/products/${id}`),
  getByCategory: (category: string) => 
    apiClient<Product[]>(`/api/products/category/${category}`),
};

export const orderApi = {
  create: (order: Order) => 
    apiClient<Order>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    }),
  getAll: () => apiClient<Order[]>('/api/orders'),
};

export const healthApi = {
  check: () => apiClient<{ status: string; timestamp: string }>('/api/health'),
};