/** A single area of the map, tied to a theme. 
 * Each map area contains many MapElements
*/
import MapElement from "./MapElement"
import { MapAreaInterface } from "./mapTypes"
import useShortPress from "../../common/hooks/useShortPress"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect } from "react"


interface MapAreaProps extends MapAreaInterface {
  zoom: number
  activeArea: string | undefined
  setActiveArea: Dispatch<SetStateAction<string | undefined>>
  setSelectedElement: Dispatch<SetStateAction<{
    name: string;
    description: string;
    x: number;
    y: number;
  }>>
  setZoomPos: Dispatch<SetStateAction<{
    x: number;
    y: number;
    scale: number;
  }>>
} 

// TODO: use <Link> objects for linking

export function MapArea ( {name, slug, colour, elements, shape, pop, capacity, 
    setSelectedElement, activeArea, setActiveArea, zoom, areaZoomPos, setZoomPos} : MapAreaProps ) {

  const path = `/map/?area=${slug}`
  const router = useRouter()
  // const shortPress = activeArea ? {} : useShortPress(() => {router.push(path)})
  const shortPress = useShortPress(() => {
    setActiveArea(slug)
    router.push(path, undefined, {shallow: true})
  })

  useEffect( () => {
    if (activeArea == slug) { 
      setZoomPos(areaZoomPos)
    }
  }, [activeArea])

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
            <MapElement zoom={zoom} areaSlug={slug} colour={colour} key={data.attributes.name} activeArea={activeArea} setSelectedElement={setSelectedElement} {...data.attributes} />
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