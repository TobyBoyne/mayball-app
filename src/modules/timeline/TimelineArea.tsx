/** The timeline area.
 * Each area contains many TimelineEvents
 */

import TimelineEvent from "./TimelineEvent"
import TimelineContext from "./TimelineContext"
import { useContext } from "react"
import { MapAreaInterface } from "../map/mapTypes"

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

export default function TimelineArea ({name, colour, elements}: MapAreaInterface) {
  const timeline = useContext(TimelineContext)

  return (
    <div className="w-full flex-grow bg-slate-200
      relative">
      <div 
        className="w-0 h-full absolute z-40
        border-red-500 border-2" 
        style={{left: timeline.scale * (timeline.time - timeline.earliest)}} 
      />
      {elements.data.map((data, index) => {
        return (
          <TimelineEvent colour={colour} key={index}
          {...data.attributes}/>
        )
      })}
    </div>
)
}