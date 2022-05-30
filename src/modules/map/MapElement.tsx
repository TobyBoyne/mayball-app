/** A single element of the map (e.g. a food stall).
 * This can have an associated start/end time to indicate when it should appear on the map.
 */

import Link from 'next/link'
import useShortPress from "../../common/hooks/useShortPress"
import { useRouter } from "next/router"
import { motion } from "framer-motion"

interface MapElementInterface {
  name: string
  shape: {w: number, h: number}
  pos: {x: number, y: number}
  link?: string
  startTime?: Date
  endTime?: Date
}


interface MapElementProps extends MapElementInterface {
  area: string
  zoom: number 
}

export default function MapElement ({name, shape, pos, area, zoom, link, startTime, endTime} : MapElementProps) {
  const zoomTransition = 2

  const style = {
    opacity: zoom > zoomTransition ? 1 : 0,
    left: pos.x,
    top: pos.y,
    height: shape.h,
    width: shape.w
  }

  const router = useRouter()

  const path = `/${area}${link ? "#" + link : ""}`
  const shortPress = useShortPress(() => {router.push(path)})

  return (
      <div
        className="absolute
        bg-emerald-400 transition-opacity duration-300"
        style={style}
        {...shortPress}
      >
        <p className="text-2xs">{name}</p>
      </div>
  )
}

export type { MapElementInterface, MapElementProps }