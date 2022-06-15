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
  colour: string
}

// TODO: use svg paths

export default function MapElement ({name, shape, area, colour, zoom, link, width, height, x, y, startTime, endTime} : MapElementProps) {
  const zoomTransition = 2
  const isActive = zoom > zoomTransition
  const style = {
    opacity: isActive ? 1 : 0.2,
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
      <g
        className='transition-opacity duration-300'
        style={style}
      >
      <rect
      className={`
        transition-opacity duration-300
        ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
      style={style}
      {...shortPress}
      {...rectShape}

      rx={width / 10}
      fill={colour}
      />
      
      <text className="text-2xl font-bold" x={x} y={y} fill={"black"}>{name}</text>
      </g>


  )
}

export type { MapElementInterface, MapElementProps }