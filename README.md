A simple and responsive Weather Application built using React.js and Tailwind CSS.
This app allows users to search for a city and view real-time weather information including temperature, weather condition, and wind speed.

The app also dynamically changes the weather card background image based on the current weather condition.

🚀 Features

🔍 City Search with Autocomplete
Fetches city suggestions as the user types using the City API.

🌡 Real-time Weather Data
Retrieves current weather information from the weather API.

🌤 Dynamic Weather Background
Weather card background changes automatically based on the weather condition (Clear, Rain, Clouds, Snow, etc.).

📱 Responsive UI
Built using Tailwind CSS for responsiveness across different screen sizes.

❌ Error Handling
Displays error messages if the city is not found.

🎨 Blur & Glass UI Effect
Uses backdrop blur and shadow effects to create a modern weather card interface.

🛠 Technologies Used

React.js

JavaScript (ES6+)

Tailwind CSS

OpenWeather API

API Ninjas City API

📦 APIs Used
1️⃣ Weather API

Provides real-time weather data.

Example data fetched:

Temperature

Weather description

Wind speed

Weather condition type

2️⃣ City API

Used to fetch city suggestions while typing.

🖥 How It Works

User enters a city name in the search field.

The app fetches city suggestions from the city API.

When the user clicks Search, the app requests weather data from the weather API.


Project Structure
src
 ├── components
 │     └── BlurText.jsx
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css

 🎨 Weather Background Logic

The app maps weather conditions to background images:

const weatherImages = {
  Clear: "/clear.jpg",
  Clouds: "/clouds.jpg",
  Rain: "/rain.jpg",
  Thunderstorm: "/storm.jpg",
  Snow: "/snow.jpg",
  Mist: "/mist.jpg",
  Default: "/default.jpg"
};

The weather condition returned by the API determines which background image is used.


📸 UI Preview

Features included in the UI:

Weather card with dynamic background

Glassmorphism blur effect

Weather information display

City suggestions dropdown


👨‍💻 Author

Muhammad Imran

Frontend Developer | React Learner

Weather information is displayed inside a dynamic weather card.

The card background changes based on the weather condition.
