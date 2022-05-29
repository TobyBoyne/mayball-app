/** A single area of the map, tied to a theme. 
 * Each map area contains many MapElements
*/
import { ReactNode } from "react"
import MapElement, { MapElementInterface } from "./MapElement"

type MapAreaProps = {
  name: string
  colour: string
  elements: MapElementInterface[]
  zoom: number
} 

// TODO: use <Link> objects for linking

export default function MapArea ( {name, colour, elements, zoom} : MapAreaProps ) {

  return (
    <>
      {elements.map((data, index) => {
        return (
          <MapElement zoom={zoom} area={name} key={data.name} {...data} />
        )
      })}
    </>
  )
}