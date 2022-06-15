/** The timeline element.
 * This represents a single event in an area.
 */

import useShortPress from "../../common/hooks/useShortPress"
import router from "next/router"
import { useContext } from "react"
import TimelineContext from "./TimelineContext"
import { MapElementInterface } from "../map/mapTypes"


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
    top: 0,
    backgroundColor: colour
  }

  // const shortPress = useShortPress(() => {router.push(path)})

  return (
    <div className="h-full rounded-md
      absolute
      flex items-center"
      style={style}
    >
      <div className="sticky w-10 left-0">{name}</div>
    </div>
  )
}