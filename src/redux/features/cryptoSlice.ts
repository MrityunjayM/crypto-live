"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CRYPTOS from "@/cryptos";

axios.defaults.baseURL = "http://localhost:3000";

export type Crypto = {
  _id: string;
  symbol: string;
  geko_id: string;
  name: string;
  price: number;
  img_small: string;
  createdAt: string;
  updatedAt: string;
};

export type InitState = {
  loading: boolean;
  selected: string;
  cryptos: Crypto[];
};

const initialState: InitState = {
  loading: true,
  selected: CRYPTOS[0],
  cryptos: [],
};

export const fetchCryptos = createAsyncThunk(
  "fetch/cryptos/latest",
  async (crypto: string, thunkApi) => {
    const { data } = await axios.get("/api/crypto/" + crypto);
    return data;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: (create) => ({
    selectCrypto: create.reducer<string>((state, action) => {
      state.cryptos = [];
      state.loading = true;
      state.selected = action.payload;
    }),
  }),
  extraReducers(builder) {
    builder
      .addCase(fetchCryptos.pending, (state, action) => {
        // use conditional loading state to prevent flikering in the ui
        if (state.cryptos.length < 1) {
          state.loading = true;
        }
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptos = action.payload;
      });
  },
});

export const { selectCrypto } = cryptoSlice.actions;

export default cryptoSlice.reducer;
