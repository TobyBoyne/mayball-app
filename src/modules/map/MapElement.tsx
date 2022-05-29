/** A single element of the map (e.g. a food stall).
 * This can have an associated start/end time to indicate when it should appear on the map.
 */

import Link from 'next/link'
import useShortPress from "./useShortPress"
import { useRouter } from "next/router"

type MapElementProps = {
  name: string
  shape: {w: number, h: number}
  pos: {x: number, y: number}
  area: string
  zoom: number
  startTime?: Date
  endTime?: Date
}

export default function MapElement ({name, shape, pos, area, zoom, startTime, endTime} : MapElementProps) {
  const style = {
    opacity: zoom - 1,
    left: pos.x,
    top: pos.y,
    height: shape.h,
    width: shape.w
  }

  const router = useRouter()

  const path = `/${area}#${name}`
  const shortPress = useShortPress(() => {router.push(path)})

  return (
    // <Link href={`/${area}`}>
      <div className="absolute
      bg-emerald-400 transition-opacity"
        style={style}
        {...shortPress}>
        <p className="text-2xs">{name}</p>
      </div>
    // </Link>
  )
}
