import { useState } from "react"
import BlurText from "./components/BlurText";

const App = () => {
  const [city, setcity] = useState("")
  const [weather, setweather] = useState(null)
  const [suggestions, setsuggestions] = useState([])
  const [error, setError] = useState("")

  const weatherImages = {
    Clear: "./clear.jpg",
    Clouds: "./clouds.jpg",
    Rain: "./rain.jpg",
    Thunderstorm: "./storm.jpg",
    Snow: "./snow.jpg",
    Mist: "./mist.jpg",
    Default: "./default.jpg"
  };

  const weatherMain = weather?.weather[0].main;
  const weatherImage = weatherImages[weatherMain] || weatherImages.Default;
  const API = import.meta.env.VITE_WEATHER_API_KEY

  const searchCity = (value) => {
    setcity(value)
    if (value.length < 3) return
    fetch(`https://api.api-ninjas.com/v1/city?name=${value}`, {
      headers: { "X-Api-Key": import.meta.env.VITE_CITY_API_KEY }
    })
      .then(res => res.json())
      .then(data => setsuggestions(data))
  }

  const getweather = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.cod !== 200) {
          setError(data.message)
          setweather(null)
          return
        }
        setweather(data)
        setError("")
      })
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-4"
      style={{ backgroundImage: "url('./default.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="backdrop-blur-lg border border-gray-400 w-full max-w-md rounded-xl p-6 shadow-lg text-center">
        
        {/* Title */}
        <BlurText
          text="Weather App"
          delay={100}
          animateBy="words"
          direction="top"
          className="text-3xl sm:text-4xl font-bold mb-4"
        />

        {/* Input */}
        <input
          className="bg-transparent border border-gray-400 rounded-md w-full py-3 px-4 mt-3 text-center text-base focus:outline-none"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => searchCity(e.target.value)}
        />

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <ul className="border border-slate-600 w-full mx-auto mt-2 rounded-md bg-black/40">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-white/10 text-sm"
                onClick={() => {
                  setcity(item.name)
                  setsuggestions([])
                }}
              >
                {item.name}, {item.country}
              </li>
            ))}
          </ul>
        )}

        {/* Button */}
        <button
          onClick={getweather}
          className="py-2 px-6 bg-blue-900 border-2 rounded-md mt-4 cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-300 text-white font-semibold"
          disabled={!city}
        >
          Search
        </button>

        {/* Error */}
        {error && (
          <h1 className="first-letter:uppercase font-bold text-red-500 text-2xl mt-4">{error}</h1>
        )}

        {/* Weather Card */}
        {weather && (
          <div
            className="rounded-2xl mt-6 overflow-hidden"
            style={{ backgroundImage: `url(${weatherImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div
              className="backdrop-blur-sm rounded-2xl p-6 text-base font-medium"
              style={{ textShadow: "1px 1px 3px black" }}
            >
              <h1 className="text-2xl font-bold mb-2">{weather.name}</h1>
              <p>🌡️ Temperature: {weather.main.temp}°C</p>
              <p>🌤️ Weather: {weather.weather[0].description}</p>
              <p>💨 Wind speed: {weather.wind.speed} km/h</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App