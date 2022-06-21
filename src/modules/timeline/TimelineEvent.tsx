/** The timeline element.
 * This represents a single event in an area.
 */

import useShortPress from "../../common/hooks/useShortPress"
import router from "next/router"
import { useContext } from "react"
import TimelineContext from "./TimelineContext"
import { MapElementInterface } from "../map/mapTypes"
import styles from "./Timeline.module.css"


 interface TimelineEventProps extends MapElementInterface {
  // children: ReactNode
  colour: string
} 

export default function TimelineEvent ({colour, name, startTime, endTime}: TimelineEventProps) {
  const timeline = useContext(TimelineContext)
  
  const start = (new Date(startTime as string)).getTime()
  const end = (new Date(endTime as string)).getTime()
  const offset = timeline.scale * (start - timeline.earliest) 
  const duration = timeline.scale * (end - start) 

  const style = {
    width: duration,
    left: offset,
    // backgroundColor: colour,
    
  }

  // const shortPress = useShortPress(() => {router.push(path)})

  return (
    <div
      style={style}
      className={`${styles.timelineEvent} bg-teal-500`}
    >
      <div className="sticky w-10 left-0">{name}</div>
    </div>
  )
}