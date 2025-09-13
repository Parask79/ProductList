import { createSlice } from "@reduxjs/toolkit";
import { Product, fetchProduct } from "../fetchProductThunk";

export interface ProductState {
  product: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  categoryFilter: string;
 hasMore: boolean;
}

const initialState: ProductState = {
  product: [],
  loading: false,
  error: null,
  searchTerm: "",
  categoryFilter: "",
  hasMore: true,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  setSearchTerm: (state, action) => {
    state.searchTerm = action.payload; // only affects local search
  },
  setCategoryFilter: (state, action) => {
    state.categoryFilter = action.payload;
    state.product = []; // clear products to load new category
    state.searchTerm = ""; // optionally clear search when category changes
  },
},

  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = [...state.product, ...action.payload];
      if (action.payload.length < 10) {
    state.hasMore = false;
  } else {
    state.hasMore = true;
  }
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setSearchTerm, setCategoryFilter} = productSlice.actions;
export default productSlice.reducer;
