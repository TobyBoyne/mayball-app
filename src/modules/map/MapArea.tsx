/** A single area of the map, tied to a theme. 
 * Each map area contains many MapElements
*/
import { ReactNode } from "react"
import MapElement from "./MapElement"

type MapAreaProps = {
  children: ReactNode
  zoom: number
} 

export default function MapArea ( {children, zoom} : MapAreaProps ) {

  return (
    <>
      <MapElement position={{x:10, y:10}} zoom={zoom} />
    </>
  )
}