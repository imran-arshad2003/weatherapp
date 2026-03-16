export default async function handler(req, res) {
  const { name } = req.query
  const response = await fetch(
    `https://api.api-ninjas.com/v1/city?name=${name}`,
    { headers: { "X-Api-Key": process.env.CITY_API_KEY } }
  )
  const data = await response.json()
  res.json(data)
}
