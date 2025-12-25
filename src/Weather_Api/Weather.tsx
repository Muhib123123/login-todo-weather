/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import "./Weather.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchWeather, fetchWeather2 } from "../features/fetch/fetchSlice";

type Weather = {
  city: string | undefined;
  temp: number | undefined;
  windSpeed: number | undefined;
  icon: string | undefined;
  humidity: number | undefined;
};
    

const Weather = () => {
  const { t, i18n } = useTranslation();
  const [weather, setWeather] = useState<Weather>({
    city: undefined,
    temp: undefined,
    windSpeed: undefined,
    icon: undefined,
    humidity: undefined,
  });
  const [search, setSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  

  const dispatch = useDispatch<any>();

  const handleSearchClick = () => {
    dispatch(fetchWeather2({ cityName: search, i18nLang: i18n.language })).then(
      (action: any) => {
        if (fetchWeather2.fulfilled.match(action)) {
          const data = action.payload;
          setWeather({
            city: data.name,
            temp: Math.round(data.main.temp),
            windSpeed: data.wind.speed,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
          });
          setSearch("");
        } else {
          setSearch(t("City not found"));
        }
      }
    );
  };

  const handleHagClick = () => {
    dispatch(fetchWeather({ i18nLang: i18n.language })).then((action: any) => {
      const data = action.payload;
      if (data) {
        setWeather({
          city: data.name,
          temp: Math.round(data.main.temp),
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
        });
      }
    });
  };

  const handleWasClick = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=52.1429&lon=4.4012&units=metric&lang=${i18n.language}&appid=c15b2d5b95dd742d47e6da815ce374a8`
      )
      .then((res) => {
        const data = res.data;
        setWeather({
          ...weather,
          city: data.name,
          temp: Math.round(data.main.temp),
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAmsClick = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=52.3676&lon=4.9041&units=metric&lang=${i18n.language}&appid=c15b2d5b95dd742d47e6da815ce374a8`
      )
      .then((res) => {
        const data = res.data;
        setWeather({
          ...weather,
          city: data.name,
          temp: Math.round(data.main.temp),
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRotClick = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=51.9244&lon=4.4777&units=metric&lang=${i18n.language}&appid=c15b2d5b95dd742d47e6da815ce374a8`
      )
      .then((res) => {
        const data = res.data;
        setWeather({
          ...weather,
          city: data.name,
          temp: Math.round(data.main.temp),
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMasClick = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Massachusetts,US&units=metric&lang=${i18n.language}&appid=c15b2d5b95dd742d47e6da815ce374a8`
      )
      .then((res) => {
        const data = res.data;
        setWeather({
          ...weather,
          city: data.name,
          temp: Math.round(data.main.temp),
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAleClick = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Aleppo,SY&units=metric&lang=${i18n.language}&appid=c15b2d5b95dd742d47e6da815ce374a8`
      )
      .then((res) => {
        const data = res.data;
        setWeather({
          ...weather,
          city: data.name,
          temp: Math.round(data.main.temp),
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIstClick = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Istanbul,TR&units=metric&lang=${i18n.language}&appid=c15b2d5b95dd742d47e6da815ce374a8`
      )
      .then((res) => {
        const data = res.data;
        setWeather({
          ...weather,
          city: data.name,
          temp: Math.round(data.main.temp),
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSalClick = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Salalah,OM&units=metric&lang=${i18n.language}&appid=c15b2d5b95dd742d47e6da815ce374a8`
      )
      .then((res) => {
        const data = res.data;
        setWeather({
          ...weather,
          city: data.name,
          temp: Math.round(data.main.temp),
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleHagClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="weather-page-container">
        <div className="weather-info-container">
          <div className="weather-date">
            <p>{moment().format("LLL")}</p>
          </div>
          <div className="weather-img">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt=""
            />
          </div>
          <div className="weather-info">
            <div className="weather-degree">
              <h1>{weather.temp}</h1>
              <p>°</p>
            </div>
            <div className="weather-more-info">
              <div>
                <p className="pw top-p">{t("Humidity")}:</p>
              </div>
              <div>
                <p className="top-p">{weather.humidity}%</p>
              </div>
              <div>
                <p className="pw">{t("Wind Speed")}:</p>
              </div>
              <div>
                <p>{weather.windSpeed} m/s</p>
              </div>
            </div>
          </div>
          <div className="weather-city">
            <h1>{weather.city}</h1>
          </div>
        </div>
        <div className="weather-cities">
          <div>
            <button onClick={handleHagClick}>{t("The Hague")}</button>
          </div>
          <div>
            <button onClick={handleWasClick}>Wassenaar</button>
          </div>
          <div>
            <button onClick={handleAmsClick}>Amsterdam</button>
          </div>
          <div>
            <button onClick={handleRotClick}>Rotterdam</button>
          </div>
          <div>
            <button onClick={handleMasClick}>Massachusetts</button>
          </div>
          <div>
            <button onClick={handleAleClick}>Aleppo</button>
          </div>
          <div>
            <button onClick={handleIstClick}>Istanbul</button>
          </div>
          <div>
            <button onClick={handleSalClick}>Salalah</button>
          </div>
          <div className="weather-search">
            <input
              type="text"
              placeholder={`${t("Search city")}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ref={inputRef}
              onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
            />
            <button onClick={handleSearchClick}>
              {}
              {t("Search")}
            </button>
          </div>
        </div>
        <div className="weather-lang">
          <select
            value={i18n.language}
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
              window.location.reload();
            }}
          >
            <option value="en">English</option>
            <option value="nl">Nederlands</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Weather;
