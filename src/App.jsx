import { useState } from "react"
import BlurText from "./components/BlurText";

const App = () => {
  const [city, setcity] = useState("")
  const [weather, setweather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [suggestions, setsuggestions] = useState([])
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("hourly") // "hourly" | "daily"

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
    const base = `https://api.openweathermap.org/data/2.5`

    // Current weather
    fetch(`${base}/weather?q=${city}&appid=${API}&units=metric`)
      .then(res => res.json())
      .then(data => {
        if (data.cod !== 200) {
          setError(data.message)
          setweather(null)
          setForecast(null)
          return
        }
        setweather(data)
        setError("")

        // Fetch 5-day forecast after current weather succeeds
        fetch(`${base}/forecast?q=${city}&appid=${API}&units=metric`)
          .then(res => res.json())
          .then(fData => setForecast(fData))
      })
  }

  // Next 24h — every 3 hours (8 slots)
  const hourlyData = forecast?.list.slice(0, 8) || []

  // 5-day — pick the 12:00:00 entry for each day
  const dailyData = forecast?.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  ).slice(0, 5) || []

  const formatHour = (dt_txt) => {
    const date = new Date(dt_txt)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDay = (dt_txt) => {
    const date = new Date(dt_txt)
    return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-4 text-white"
      style={{ backgroundImage: "url('./default.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="backdrop-blur-lg bg-black/10 border border-gray-400 w-full max-w-md rounded-xl p-6 shadow-lg text-center text-white">

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
          className="py-2 px-6 bg-blue-900 border-2 rounded-md mt-4 cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-800 text-white font-semibold"
          disabled={!city}
        >
          Search
        </button>

        {/* Error */}
        {error && (
          <h1 className="first-letter:uppercase font-bold text-red-500 text-2xl mt-4">{error}</h1>
        )}

        {/* Current Weather Card */}
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

        {/* Forecast Section */}
        {forecast && (
          <div className="mt-6">
            {/* Tab Switcher */}
            <div className="flex rounded-lg overflow-hidden border border-gray-500 mb-4">
              <button
                onClick={() => setActiveTab("hourly")}
                className={`flex-1 py-2 text-sm font-semibold transition-colors ${
                  activeTab === "hourly" ? "bg-blue-900 text-white" : "bg-black/20 text-gray-300"
                }`}
              >
                Hourly (24h)
              </button>
              <button
                onClick={() => setActiveTab("daily")}
                className={`flex-1 py-2 text-sm font-semibold transition-colors ${
                  activeTab === "daily" ? "bg-blue-900 text-white" : "bg-black/20 text-gray-300"
                }`}
              >
                5-Day Forecast
              </button>
            </div>

            {/* Hourly Forecast */}
            {activeTab === "hourly" && (
              <div className="flex gap-2 overflow-x-auto pb-2 -scrollbar-hide">
                {hourlyData.map((item, i) => (
                  <div
                    key={i}
                    className="flex shrink-0 bg-black/30 border border-gray-500 rounded-xl px-3 py-2 text-center text-xs min-w-[72px]"
                  >
                    <p className="font-semibold text-gray-300">{formatHour(item.dt_txt)}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      className="w-8 h-8 mx-auto"
                    />
                    <p className="font-bold text-sm">{Math.round(item.main.temp)}°C</p>
                    <p className="text-gray-400 capitalize">{item.weather[0].main}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 5-Day Forecast */}
            {activeTab === "daily" && (
              <div className="flex flex-col gap-2">
                {dailyData.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-black/30 border border-gray-500 rounded-xl px-4 py-2"
                  >
                    <p className="text-sm font-semibold w-28 text-left">{formatDay(item.dt_txt)}</p>
                    <div className="flex items-center gap-1">
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt={item.weather[0].description}
                        className="w-8 h-8"
                      />
                      <span className="text-xs text-gray-300 capitalize">{item.weather[0].description}</span>
                    </div>
                    <p className="text-sm font-bold">{Math.round(item.main.temp)}°C</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App