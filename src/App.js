import React, {useState} from 'react';

const api = {
  key: '1e96cf99930c0192bd53fe21fa67fbc1',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if(e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(data => {
          setWeather(data);
          setQuery('');
          console.log(data);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }


  return (
    <div className="app">
      <main>
        {/* Search Box */}
        <div className="search-box">
          <input type='text' className='search-bar' placeholder='search...' onChange={e => {setQuery(e.target.value)}} value={query} onKeyPress={search}/>
        </div>

  {/* ONLY LOAD IF SEARCHBOX IS NOT EMPTY */}
        {(typeof weather.main != 'undefined') ? (
          /* Location Box */
          <>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            {/* Weather Box */}
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°F</div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </>
          
        ) : ('')}
      </main>
    </div>
  );
}

export default App;