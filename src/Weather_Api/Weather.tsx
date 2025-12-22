import { useState, useEffect } from "react";
import "./Weather.css";
import axios from "axios";

type Weather = {
  city: string | undefined;
  temp: number | undefined;
  windSpeed: number | undefined;
  icon: string | undefined;
  humidity: number | undefined;
};

const Weather = () => {
  const [weather, setWeather] = useState<Weather>({
    city: undefined,
    temp: undefined,
    windSpeed: undefined,
    icon: undefined,
    humidity: undefined,
  });

  const handleHagClick = () => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=The+Hague,NL&units=metric&appid=c15b2d5b95dd742d47e6da815ce374a8"
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

  const handleWasClick = () => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=52.1429&lon=4.4012&units=metric&appid=c15b2d5b95dd742d47e6da815ce374a8"
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
        "https://api.openweathermap.org/data/2.5/weather?lat=52.3676&lon=4.9041&units=metric&appid=c15b2d5b95dd742d47e6da815ce374a8"
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
        "https://api.openweathermap.org/data/2.5/weather?lat=51.9244&lon=4.4777&units=metric&appid=c15b2d5b95dd742d47e6da815ce374a8"
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
        "https://api.openweathermap.org/data/2.5/weather?q=Massachusetts,US&units=metric&appid=c15b2d5b95dd742d47e6da815ce374a8"
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
        "https://api.openweathermap.org/data/2.5/weather?q=Aleppo,SY&units=metric&appid=c15b2d5b95dd742d47e6da815ce374a8"
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
        "https://api.openweathermap.org/data/2.5/weather?q=Istanbul,TR&units=metric&appid=c15b2d5b95dd742d47e6da815ce374a8"
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
        "https://api.openweathermap.org/data/2.5/weather?q=Salalah,OM&units=metric&appid=c15b2d5b95dd742d47e6da815ce374a8"
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
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=52.0705&lon=4.3007&units=metric&appid=c15b2d5b95dd742d47e6da815ce374a8"
      )
      .then((respense) => {
        const res = respense.data;
        setWeather({
          ...weather,
          city: res.name,
          temp: Math.round(res.main.temp),
          windSpeed: res.wind.speed,
          icon: res.weather[0].icon,
          humidity: res.main.humidity,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="weather-page-container">
      <div className="weather-info-container">
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
              <p className="pw top-p">Humidity:</p>
            </div>
            <div>
              <p className="top-p">{weather.humidity}%</p>
            </div>
            <div>
              <p className="pw">Wind Speed:</p>
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
          <button onClick={handleHagClick}>The Hague</button>
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
      </div>
    </div>
  );
};

export default Weather;
