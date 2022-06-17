/** A single element of the map (e.g. a food stall).
 * This can have an associated start/end time to indicate when it should appear on the map.
 */

import Link from 'next/link'
import useShortPress from "../../common/hooks/useShortPress"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import styles from "./map.module.css"
import { MapElementInterface } from "./mapTypes"
import { useEffect, useState, Dispatch, SetStateAction } from 'react'

interface MapElementProps extends MapElementInterface {
  area: string
  zoom: number 
  colour: string
  activeArea: boolean
  setSelectedElement: Dispatch<SetStateAction<{
    name: string;
    description: string;
    x: number;
    y: number;
}>>
}

// TODO: use svg paths

export default function MapElement ({name, description, shape, area, colour, zoom, activeArea, setSelectedElement, width, height, x, y, startTime, endTime} : MapElementProps) {
  const zoomTransition = 2
  const isActive = zoom > zoomTransition

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
    setCurrentlyOpen((start < time) && (time < end) )
  }, [time])

  return (
      // TODO: circles have rx=1000
      <g
        className='transition-opacity duration-300'
        onClick={() => setSelectedElement({name, description, x, y})}
      >
      <rect
      className={`
        transition-opacity duration-300
        ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
      fillOpacity={isActive ? 0.5 : 0}
      {...rectShape}
      display={currentlyOpen ? "inline" : "none"}
      rx={width / 10}
      fill={colour}
      />
      </g>


  )
}

export type { MapElementInterface, MapElementProps }