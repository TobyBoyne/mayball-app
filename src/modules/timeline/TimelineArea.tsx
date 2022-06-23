/** The timeline area.
 * Each area contains many TimelineEvents
 */

import TimelineEvent from "./TimelineEvent"
import TimelineContext from "./TimelineContext"
import { useContext, CSSProperties } from "react"
import { MapAreaInterface } from "../map/mapTypes"
import styles from "./Timeline.module.css"

type EventDetails = {
  // children: ReactNode
  name: string
  start: string
  end: string
} 

type TimelineAreaProps = {
  // children: ReactNode
  name: string
  colour: string
  elements: EventDetails[]
} 

interface Props extends MapAreaInterface {
  splitrows?: boolean
}


export default function TimelineArea ({name, colour, elements, splitrows=false}: Props) {
  const timeline = useContext(TimelineContext)

  const timelineElements = elements.data.filter((el) => {
    const event_type = el.attributes.event_type.data?.attributes.name
    return (
      event_type != "Food" &&
      event_type != "Drink" && 
      el.attributes.onTimeline
    )
  }
  ).sort((el1, el2) => {
    return (
      (new Date(el1.attributes.startTime as string)).getTime() - (new Date(el2.attributes.startTime as string)).getTime()
    )
  })

  const splitY = splitrows ? 100 / timelineElements.length : 0
  const splitHeight = splitrows ? 100 / timelineElements.length : 100

  const majorTicks = 1 * 60 * 60 * 1000 * timeline.scale

  const bgstyle: CSSProperties = {
    backgroundImage: `linear-gradient(90deg, aliceblue 49%, rgba(0,0,0,0.5) 50%, aliceblue 50%, aliceblue 98%, rgba(0,0,0,1) 100%)`,
    backgroundSize: `${majorTicks}px 10px`
  }

  return (
    <div className={styles.timelineArea}
      style={bgstyle}
    >
      <div 
        className="w-0 h-full absolute z-40
        border-red-500 border-2" 
        style={{
          left: timeline.scale * (timeline.time - timeline.earliest),
        }} 
      />
      {timelineElements.map((data, index) => {
        return (
          <TimelineEvent colour={colour} key={index} splitY={splitY * index} splitHeight={splitHeight}
          {...data.attributes}/>
        )
      })}
    </div>
)
}