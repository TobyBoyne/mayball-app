import { MapDataInterface, MapAreaInterface } from "./mapTypes"
import qs from "qs"

export async function loadMapData() {
  // Call an external API endpoint to get all element data
  const query = qs.stringify({
    populate: {
      elements: {
        populate: ["event_type"]
      }
    }
  })
  console.log(`https://downingball-cms.herokuapp.com/api/areas?${query}`)
  const res = await fetch(`https://downingball-cms.herokuapp.com/api/areas?${query}`)
  const responseData = await res.json()
  const mapData: MapDataInterface[] = responseData.data
  return mapData
}

export async function loadEventsData() {
  const query = qs.stringify({
    populate: "*"
  })
  const res = await fetch(`https://downingball-cms.herokuapp.com/api/elements?${query}`)
  const responseData = await res.json()
  const eventData: any = responseData.data
  return eventData
}

export async function loadAreaData(slug: string) {
  // Call an external API endpoint to get a single area
  const query = qs.stringify({
    populate: {
      element: {
        populate: ["event_type"]
      }
    },
    filters: {
      slug: [slug]
    }
  })
  const res = await fetch(`https://downingball-cms.herokuapp.com/api/areas?populate=*&filters[slug]=${slug}`)
  const responseData = await res.json()
  const areaData: MapAreaInterface = responseData.data[0]?.attributes
  return areaData
}