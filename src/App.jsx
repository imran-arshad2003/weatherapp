import { useState } from "react"
import BlurText from "./components/BlurText";



const App = () => {

  const [city, setcity] = useState("")
  const [weather, setweather] = useState(null)
  const [suggestions, setsuggestions] = useState([])
  const [error, setError] = useState("")

  const weatherImages = {
    Clear: "/clear.jpg",
    Clouds: "/clouds.jpg",
    Rain: "/rain.jpg",
    Thunderstorm: "/storm.jpg",
    Snow: "/snow.jpg",
    Mist: "/mist.jpg",
    Default: "/default.jpg"
  };

  const weatherMain = weather?.weather[0].main;
  console.log(weatherMain);
  const weatherImage = weatherImages[weatherMain] || weatherImages.Default;

  const API = import.meta.env.VITE_WEATHER_API_KEY

  const searchCity = (value) => {

    setcity(value)

    if (value.length < 3) return

    fetch(`https://api.api-ninjas.com/v1/city?name=${value}`, {
      headers: {
        "X-Api-Key": import.meta.env.VITE_CITY_API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        setsuggestions(data)

      })
  }

  const getweather = () => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`

    fetch(url)
      .then(res => res.json())
      .then(data => {

        console.log(data);


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
    <div className="bg-[url('/default.jpg')] bg-cover bg-center h-screen flex flex-col items-center py-20">


      <div className=" backdrop-blur-lg border-2 h-screen border-gray-400 w-1/2 sm:w-[80%] md:w-[60%] lg:w-[40%]  rounded-xl p-6 shadow-lg hover:scale-98 text-center">
        <BlurText
          text="Weather App"
          delay={100}
          animateBy="words"
          direction="top"
          className=" px-auto m:text-6xl md:text-6xl lg:text-6xl sm:text-3xl "
        />


        <input
          className="  bg-transparent  rounded-md w-full py-3 mt-5 text-center text-lg"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => searchCity(e.target.value)}
        />

        {suggestions.length > 0 && (
          <ul className="border-2 sm:w-[80%] md:w-[60%] lg:w-[60%]  mx-auto mt-2 rounded-md border-slate-600 ">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer"
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

        <button
          onClick={getweather}
          className="py-2 px-6 bg-blue-900 border-2 rounded-md m-2 cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-300 text-white font-semibold"
          disabled={!city}
        >
          Search
        </button>


        {error &&

          <h1 className="first-letter:uppercase font-bold text-red-700 text-5xl">{error}</h1>

        }




        {weather && (

          <div className="rounded-3xl" style={{
            backgroundImage: `url(${weatherImage})`,
            backgroundSize: "cover"
          }}>
            <div className="bg- backdrop-blur-sm border-gray-90 border-3 rounded-2xl shadow-2xl p-8 text-xl text-shadow-black text-shadow-2xs "
            style={{ textShadow: "2px 2px 2px black" }}
            >


              <h1>{weather.name}</h1>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <p>Wind speed {weather.wind.speed}km/h</p>





            </div>


          </div>



        )}



        <div>

        </div>
      </div>




    </div>
  )
}

export default App