import { createAsyncThunk } from "@reduxjs/toolkit";
import { productList } from "../api/productList";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async ({ limit, skip, category }: { limit: number; skip: number; category?: string }, thunkAPI) => {
    try {
      let url = "";

      if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }
console.log("Category in thunk:", url);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network error");
      const data = await response.json();
      return data.products;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
