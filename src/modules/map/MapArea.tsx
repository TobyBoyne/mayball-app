/** A single area of the map, tied to a theme. 
 * Each map area contains many MapElements
*/
import { ReactNode } from "react"
import MapElement from "./MapElement"
import { MapElementInterface, MapAreaInterface } from "./mapTypes"
import { motion } from "framer-motion"

interface MapAreaProps extends MapAreaInterface {
  zoom: number
} 

// TODO: use <Link> objects for linking

export function MapArea ( {name, colour, elements, pop, capacity, zoom} : MapAreaProps ) {
  return (
    <>
      {elements.map((data, index) => {
          return (
            <MapElement zoom={zoom} area={name} key={data.name} {...data} />
          )
        })
      }
    </>
  )
}

export function HeatmapArea ( {shape, pop, capacity}  : MapAreaProps) {
  const capacityFraction = Math.round(100 * (0.9 - pop / capacity))
  return (
    <path 
    fill={`hsl(${capacityFraction} 50% 50% / 0.7)`}
    filter="url(#blur)"
    d={shape}
    />

  )

}