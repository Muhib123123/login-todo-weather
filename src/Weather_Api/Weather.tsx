/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import "./Weather.css";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../features/fetch/fetchSlice";
import { Link } from "react-router";
type Weather = {
  city: string | undefined;
  temp: number | undefined;
  windSpeed: number | undefined;
  icon: string | undefined;
  humidity: number | undefined;
};

type RootState = {
  fetch: {
    value: Weather;
    loading: boolean;
    error: boolean;
  };
};

type WeatherProps = {
  setEmailWithName: React.Dispatch<
    React.SetStateAction<{ name: string; email: string | null }>
  >;
  setCheck: React.Dispatch<
    React.SetStateAction<{
      age: boolean;
      name: boolean;
      email: boolean;
      goodToGo: boolean;
    }>
  >;
};

const Weather = ({ setEmailWithName, setCheck }: WeatherProps) => {

  const [search, setSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const weather = useSelector((state: RootState) => state.fetch.value);
  const apiError = useSelector((state: RootState) => state.fetch.error);
  const apiLoading = useSelector((state: RootState) => state.fetch.loading);

  const dispatch = useDispatch<any>();
  const { t, i18n } = useTranslation();

  const handleSearchClick = () => {
    if (!search) {
      inputRef.current?.focus();
      setSearch("Write city name");
      return;
    } else {
      dispatch(fetchWeather({ cityName: search, i18nLang: i18n.language }));
      setSearch("");
    }
  };

  const handleHagClick = () => {
    dispatch(fetchWeather({ i18nLang: i18n.language, cityName: "The Hague" }));
  };

  const handleWasClick = () => {
    dispatch(fetchWeather({ i18nLang: i18n.language, cityName: "Wassenaar" }));
  };

  const handleAmsClick = () => {
    dispatch(fetchWeather({ i18nLang: i18n.language, cityName: "Amsterdam" }));
  };

  const handleRotClick = () => {
    dispatch(fetchWeather({ i18nLang: i18n.language, cityName: "Rotterdam" }));
  };

  const handleMasClick = () => {
    dispatch(
      fetchWeather({ i18nLang: i18n.language, cityName: "Massachusetts" })
    );
  };

  const handleAleClick = () => {
    dispatch(fetchWeather({ i18nLang: i18n.language, cityName: "Aleppo" }));
  };

  const handleIstClick = () => {
    dispatch(fetchWeather({ i18nLang: i18n.language, cityName: "Istanbul" }));
  };

  const handleSalClick = () => {
    dispatch(fetchWeather({ i18nLang: i18n.language, cityName: "Salalah" }));
  };

  useEffect(() => {
    if (apiError) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [apiError]);

  useEffect(() => {
    handleHagClick();
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <title>weather</title>
      <div className="weather-page-container">
        {apiError ? (
          <h1 className="weather-error">
            Error <span style={{ color: "red" }}>401</span>. Please try again.
          </h1>
        ) : (
          <>
            {apiLoading ? (
              <div className="loader-container">
                <h1 className="loader"></h1>
              </div>
            ) : (
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
            )}
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
            <div className="weather-logout">
              <Link to="/">
                <button
                  onClick={() => {
                    setCheck({
                      age: false,
                      name: false,
                      email: false,
                      goodToGo: false,
                    });
                    localStorage.removeItem("email");
                    setEmailWithName({
                      name: "",
                      email: null,
                    });
                  }}
                >
                  {t("Log out")}
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Weather;
