import "./Weather.css";

const Weather = () => {
  return (
    <div className="weather-page-container">
      <div className="weather-info-container">
        <div className="weather-img">
          <img src="" alt="" />
        </div>
        <div className="weather-info">
          <div className="weather-degree">
            <h1>
              14
            </h1>
            <span className="cl"></span>
            <span className="cl2"></span>
          </div>
          <div className="weather-more-info">
            <div>
               <p className="pw top-p">Humidity:</p> 
            </div>
            <div>
               <p className="top-p">44%</p> 
            </div>
            <div>
               <p className="pw">Wind Speed:</p> 
            </div>
            <div>
                <p>10mph</p>
            </div>
            
          </div>
        </div>
        <div className="weather-city">
          <h1>New York</h1>
        </div>
      </div>
    </div>
  );
};

export default Weather;
