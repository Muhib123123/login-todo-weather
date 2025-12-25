import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface CounterState {
  value: object | null;
}

const initialState: CounterState = {
  value: {},
};

export const fetchWeather = createAsyncThunk(
  "fetch/weather",
  async ({ i18nLang }: { i18nLang: string }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=The+Hague,NL&units=metric&lang=${i18nLang}&appid=c15b2d5b95dd742d47e6da815ce374a8`
    );
    return response.data;
  }
);

export const fetchWeather2 = createAsyncThunk(
  "fetch/weather2",
  async ({ cityName, i18nLang }: { cityName: string; i18nLang: string }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=${i18nLang}&appid=c15b2d5b95dd742d47e6da815ce374a8`
    );
    return response.data;
  }
);


export const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(fetchWeather.rejected, (_, action) => {
      console.log(action.error);
    });
    builder.addCase(fetchWeather.pending, (state) => {
      state.value = null;
    });
    builder.addCase(fetchWeather2.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(fetchWeather2.rejected, (_, action) => {
        console.log(action.error.message);
    });
    builder.addCase(fetchWeather2.pending, (state) => {
      state.value = null;
    });
  },
});


export default fetchSlice.reducer;
