/** A single element of the map (e.g. a food stall).
 * This can have an associated start/end time to indicate when it should appear on the map.
 */

import Link from 'next/link'
import useShortPress from "../../common/hooks/useShortPress"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import styles from "./map.module.css"
import { MapElementInterface, Selection } from "./mapTypes"
import { useEffect, useState, Dispatch, SetStateAction } from 'react'

interface MapElementProps extends MapElementInterface {
  areaSlug: string
  zoom: number 
  colour: string
  activeArea: string | undefined
  setSelectedElement: Dispatch<SetStateAction<Selection | undefined>>
}

export default function MapElement ({name, description, shape, areaSlug, colour, zoom, activeArea, setSelectedElement, width, height, x, y, startTime, endTime} : MapElementProps) {
  const zoomTransition = 2
  const isActive = activeArea == areaSlug

  const [time, setTime] = useState((new Date("2022-06-23T23:00")).getTime())
  const [currentlyOpen, setCurrentlyOpen] = useState(true)

  const rectShape = {
    width: width,
    height: height,
    x: x,
    y: y
  }
  // TODO: handle time properly
  const start = (new Date(startTime as string)).getTime()
  const end = (new Date(endTime as string)).getTime()
  useEffect(() => {
    setCurrentlyOpen((0 < time) && (time < end || end == 0) )
  }, [time])

  return (
      // TODO: circles have rx=1000
      <g
        className={`transition-opacity duration-300
        ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
        onClick={() => setSelectedElement({
          name, 
          description, 
          x: x + width / 2, 
          y: y + height / 2,
          start: startTime?.slice(11, 16) as string,
          end: endTime?.slice(11, 16) as string,
        })}
      >
      <rect
      className={`
        transition-opacity duration-300
        fill-teal-600
        `}
      fillOpacity={isActive ? 1 : 0}
      {...rectShape}
      display={currentlyOpen ? "inline" : "none"}
      rx={width / 10}
      // fill={colour}
      />
      </g>


  )
}

export type { MapElementInterface, MapElementProps }