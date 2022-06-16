/** A single area of the map, tied to a theme. 
 * Each map area contains many MapElements
*/
import MapElement from "./MapElement"
import { MapAreaInterface } from "./mapTypes"
import useShortPress from "../../common/hooks/useShortPress"
import { useRouter } from "next/router"


interface MapAreaProps extends MapAreaInterface {
  zoom: number
} 

// TODO: use <Link> objects for linking

export function MapArea ( {name, colour, elements, shape, pop, capacity, zoom} : MapAreaProps ) {
  const path = `/areas/${name}`
  const router = useRouter()
  const shortPress = useShortPress(() => {router.push(path)})

  return (
    <g
      {...shortPress}
    >
      <polygon
        points={shape}
        fill={colour}
        opacity={0.3}
        stroke={colour}
        strokeLinejoin={"round"}
        strokeWidth={20}
      >

      </polygon>
      {elements.data.map((data, index) => {
          return (
            <MapElement zoom={zoom} area={name} colour={colour} key={data.attributes.name} {...data.attributes} />
          )
        })
      }
    </g>
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