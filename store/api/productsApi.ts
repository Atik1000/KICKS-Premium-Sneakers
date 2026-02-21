import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiProduct, ApiCategory } from '@/types';
import { API_ENDPOINTS } from '@/lib/api';

/**
 * RTK Query API for products and categories
 * Handles data fetching with caching, loading, and error states
 */
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ApiProduct[], { offset?: number; limit?: number } | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.offset != null) searchParams.set('offset', String(params.offset));
        if (params?.limit != null) searchParams.set('limit', String(params.limit));
        const query = searchParams.toString();
        return `${API_ENDPOINTS.products}${query ? `?${query}` : ''}`;
      },
    }),
    getProductById: builder.query<ApiProduct, number | string>({
      query: (id) => API_ENDPOINTS.productById(id),
    }),
    getCategories: builder.query<ApiCategory[], void>({
      query: () => API_ENDPOINTS.categories,
    }),
    getCategoryById: builder.query<ApiCategory, number | string>({
      query: (id) => API_ENDPOINTS.categoryById(id),
    }),
    getProductsByCategory: builder.query<ApiProduct[], number | string>({
      query: (id) => API_ENDPOINTS.categoryProducts(id),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
