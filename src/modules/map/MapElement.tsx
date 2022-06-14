/** A single element of the map (e.g. a food stall).
 * This can have an associated start/end time to indicate when it should appear on the map.
 */

import Link from 'next/link'
import useShortPress from "../../common/hooks/useShortPress"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { MapElementInterface } from "./mapTypes"

interface MapElementProps extends MapElementInterface {
  area: string
  zoom: number 
}

// TODO: use svg paths

export default function MapElement ({name, shape, area, zoom, link, width, height, x, y, startTime, endTime} : MapElementProps) {
  const zoomTransition = 2
  const isActive = zoom > zoomTransition
  const style = {
    opacity: isActive ? 1 : 0,
    // left: 10,
    // top: 10,
    // height: 100,
    // width: 100
  }

  const rectShape = {
    width: width,
    height: height,
    x: x,
    y: y
  }

  const router = useRouter()

  const path = `/areas/${area}${link ? "#" + link : ""}`
  const shortPress = useShortPress(() => {router.push(path)})

  return (
      // TODO: circles have rx=1000
      <rect
      className={`absolute
        transition-opacity duration-300
        ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
      style={style}
      {...shortPress}
      {...rectShape}

      fill={"red"}
      >
        <text className="text-2xs">{name}</text>
      </rect>


  )
}

export type { MapElementInterface, MapElementProps }