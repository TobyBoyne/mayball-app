/** The timeline element.
 * This represents a single event in an area.
 */

import useShortPress from "../../common/hooks/useShortPress"
import router from "next/router"
import { useContext } from "react"
import TimelineContext from "./TimelineContext"


 type TimelineEventProps = {
  // children: ReactNode
  colour: string
  name: string
  start: string
  end: string
} 

export default function TimelineEvent ({colour, name, start, end}: TimelineEventProps) {
  const timeline = useContext(TimelineContext)

  const startTime = (new Date(start)).getTime()
  const endTime = (new Date(end)).getTime()

  const offset = timeline.scale * (startTime - timeline.earliest) 
  const duration = timeline.scale * (endTime - startTime) 

  const style = {
    width: duration,
    left: offset,
    top: 0
  }

  // const shortPress = useShortPress(() => {router.push(path)})

  return (
    <div className={`${colour} h-full rounded-md
      absolute`}
      style={style}
      key={name}>
        <p>{name}</p>
    </div>
  )
}