import { useState } from "react";
import "./App.css";
// import weather from './weather.png';

function App() {

  const [city, setCity] = useState('');
  const [weatherCount, setWeather] = useState(); 
  const [isloading,setisLoading]= useState(false);

  let submitted = (e) => {
    e.preventDefault();
if (city==='') {
  alert('City name to likho')
}else{
  setisLoading(!isloading)
  console.log(isloading);
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
}
setisLoading(false)
console.log(isloading);

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
        <img src="https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif" alt="" className={isloading ? "loading" : "hidden"}></img>

          {weatherCount!==undefined ? 
            (<> 
              <h3>{weatherCount.name}</h3> {/* Display city name */}
              <h2>{weatherCount.main.temp}°C</h2> {/* Display temperature */}
              <p>{weatherCount.weather[0].description}</p> {/* Display weather description */}
              <img src={`http://openweathermap.org/img/w/${weatherCount.weather[0].icon}.png`} alt="weather icon" />
              
            </>)
           :  (
            // Fallback for cases where no data is found or an error occurs
            <p>No Data</p>
          )}   
          
        </div> 
      </div>
    </div>
  );
}

export default App;
