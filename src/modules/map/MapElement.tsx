/** A single element of the map (e.g. a food stall).
 * This can have an associated start/end time to indicate when it should appear on the map.
 */

import Link from 'next/link'
import useShortPress from "../../common/hooks/useShortPress"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { MapElementInterface } from "./mapTypes"
import { useEffect, useState } from 'react'

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
    opacity: isActive ? 0.5 : 0,
  }

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
        style={style}
      >
      <rect
      className={`
        transition-opacity duration-300
        ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
      style={style}
      {...rectShape}
      display={currentlyOpen ? "inline" : "none"}
      rx={width / 10}
      fill={colour}
      />
      
      {/* <text className="text-2xl font-bold" x={x} y={y} fill={"black"}>{name}</text> */}
      </g>


  )
}

export type { MapElementInterface, MapElementProps }