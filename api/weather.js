export default async function handler(req, res) {
  const { city } = req.query
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
  )
  const data = await response.json()
  res.json(data)
}