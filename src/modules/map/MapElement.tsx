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
  colour: string
  activeArea: string | undefined
  setSelectedElement: Dispatch<SetStateAction<Selection | undefined>>
}

export default function MapElement ({name, description, shape, areaSlug, colour, 
  activeArea, setSelectedElement, width, height, x, y, startTime, endTime} : MapElementProps) {
  const zoomTransition = 2
  const isActive = activeArea == areaSlug

  const [time, setTime] = useState(Math.round(new Date().getTime() / 1000000) * 1000000)
  const [currentlyOpen, setCurrentlyOpen] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => { // Creates an interval which will update the current data every minute
    // This will trigger a rerender every component that uses the useDate hook.
    const newTime = Math.round(new Date().getTime() / 1000000) * 1000000
    setTime(newTime);
  }, 60*1000);
  return () => {
    clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
  }
}, []);

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