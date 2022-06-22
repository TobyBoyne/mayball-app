/** A single area of the map, tied to a theme. 
 * Each map area contains many MapElements
*/
import MapElement from "./MapElement"
import { MapAreaInterface, Selection } from "./mapTypes"
import useShortPress from "../../common/hooks/useShortPress"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect } from "react"


interface MapAreaProps extends MapAreaInterface {
  activeArea: string | undefined
  setActiveArea: Dispatch<SetStateAction<string | undefined>>
  setSelectedElement: Dispatch<SetStateAction<Selection | undefined>>
  setZoomPos: Dispatch<SetStateAction<{
    x: number;
    y: number;
    scale: number;
  }>>
} 

// TODO: use <Link> objects for linking

export function MapArea ( {name, slug, colour, elements, shape, 
    setSelectedElement, activeArea, setActiveArea, areaZoomPos, setZoomPos} : MapAreaProps ) {

  const path = `/map/?area=${slug}`
  const router = useRouter()
  // const shortPress = activeArea ? {} : useShortPress(() => {router.push(path)})
  const shortPress = useShortPress(() => {
    if (activeArea != slug) {
      router.push(path, undefined, {shallow: true})
    } 
    setActiveArea(slug)
    setSelectedElement(undefined)
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
        // fill={colour}
        opacity={0.3}
        // stroke={colour}
        strokeLinejoin={"round"}
        strokeWidth={20}
        className="fill-teal-500 stroke-teal-500"
      >

      </polygon>
      {elements.data.map((data, index) => {
          return (
            <MapElement areaSlug={slug} colour={colour} key={data.attributes.name} activeArea={activeArea} setSelectedElement={setSelectedElement} {...data.attributes} />
          )
        })
      }
    </g>
  )
}

export function HeatmapArea ( {shape, busyness}  : MapAreaInterface) {
  const capacityFraction = busyness * 20

  const shortPress = useShortPress(() => {
    console.log(capacityFraction)
  })

  return (
    // <path 
    //   fill={`hsl(${capacityFraction} 50% 50% / 0.7)`}
    //   filter="url(#blur)"
    //   d={shape}
    // />

    <polygon
        points={shape}
        // fill={colour}
        fill={`hsl(${capacityFraction} 50% 50% / 0.7)`}
        opacity={0.5}
        // stroke={colour}
        strokeLinejoin={"round"}
        strokeWidth={20}
        {...shortPress}
      ></polygon>

  )

}