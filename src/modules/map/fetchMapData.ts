import { MapDataInterface } from "./mapTypes"

export async function loadMapData() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:1337/api/areas/?populate=*')
  const responseData = await res.json()
  const mapData: MapDataInterface = responseData.data
  return mapData
}