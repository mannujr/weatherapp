import { useState } from "react";
import "./App.css";
// import weather from './weather.png';

function App() {

  const [city, setCity] = useState('');
  const [weatherCount, setWeather] = useState(); 

  let submitted = (e) => {
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.cod==="404") {
          setWeather(undefined)
        }else{
          setWeather(data)
        }
      });

    setCity(''); // Clear input field after submission
  };

  return (
    <div className="App">
      <h1>WEATHER APP</h1>
      <div className="main">
        <form onSubmit={submitted}>
          <input 
            type='text' 
            value={city} 
            placeholder="Enter City Name..." 
            onChange={(e) => setCity(e.target.value)} 
          />
          <button>Submit</button>
        </form>
        <div className="display">
          {weatherCount!==undefined ? 
            (<> 
              <h3>{weatherCount.name}</h3> {/* Display city name */}
              <h2>{weatherCount.main.temp}°C</h2> {/* Display temperature */}
              <p>{weatherCount.weather[0].description}</p> {/* Display weather description */}
              <img src={`http://openweathermap.org/img/w/${weatherCount.weather[0].icon}.png`} alt="weather icon" />
              
            </>)
           :  (
            // Fallback for cases where no data is found or an error occurs
            <p>No Data Found</p>
          )}   
          
        </div> 
      </div>
    </div>
  );
}

export default App;
