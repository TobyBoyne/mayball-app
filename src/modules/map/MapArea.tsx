/** A single area of the map, tied to a theme. 
 * Each map area contains many MapElements
*/
import { ReactNode } from "react"
import MapElement from "./MapElement"

type MapAreaProps = {
  name: string
  colour: string
  elements: {
    name: string
    shape: {w: number, h: number}
    pos: {x: number, y: number}
  }[]
  zoom: number
} 

export default function MapArea ( {name, colour, elements, zoom} : MapAreaProps ) {

  return (
    <>
      {elements.map((data, index) => {
        return (
          <MapElement zoom={zoom} area={name} {...data} />
        )
      })}
    </>
  )
}