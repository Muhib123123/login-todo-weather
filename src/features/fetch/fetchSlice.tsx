import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface CounterState {
  value: object | null;
  loading: boolean;
  error: boolean;
}

const initialState: CounterState = {
  value: {},
  loading: false,
  error: false
};

export const fetchWeather = createAsyncThunk(
  "fetch/weather",
  async ({ i18nLang, cityName }: { i18nLang: string; cityName: string }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=${i18nLang}&appid=c15b2d5b95dd742d47e6da815ce374a8`
    );

    const city = response.data.name;
    const temp = Math.round(response.data.main.temp);
    const windSpeed = response.data.wind.speed;
    const icon = response.data.weather[0].icon;
    const humidity = response.data.main.humidity;

    return { city, temp, windSpeed, icon, humidity };
  }
);



export const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchWeather.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchWeather.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.value = {};
    });
  },
});


export default fetchSlice.reducer;
