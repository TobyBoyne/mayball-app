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

export default function MapElement ({name, shape, area, zoom, link, startTime, endTime} : MapElementProps) {
  const zoomTransition = 2

  const style = {
    opacity: zoom > zoomTransition ? 1 : 0,
    left: 10,
    top: 10,
    height: 100,
    width: 100
  }

  const router = useRouter()

  const path = `/areas/${area}${link ? "#" + link : ""}`
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