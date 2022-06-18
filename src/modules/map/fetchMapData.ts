import { MapDataInterface, MapAreaInterface } from "./mapTypes"
import qs from "qs"

export async function loadMapData() {
  // Call an external API endpoint to get all element data
  const res = await fetch('https://downingball-cms.herokuapp.com/api/areas?populate=*')
  const responseData = await res.json()
  const mapData: MapDataInterface[] = responseData.data
  return mapData
}

export async function loadAreaData(slug: string) {
  // Call an external API endpoint to get a single area
  const res = await fetch(`https://downingball-cms.herokuapp.com/api/areas?populate=*&filters[slug]=${slug}`)
  const responseData = await res.json()
  const areaData: MapAreaInterface = responseData.data[0]?.attributes
  return areaData
}