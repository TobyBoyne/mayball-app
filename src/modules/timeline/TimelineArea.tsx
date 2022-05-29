/** The timeline area.
 * Each area contains many TimelineEvents
 */

import TimelineEvent from "./TimelineEvent"

type EventDetails = {
  // children: ReactNode
  name: string
  start: string
  end: string
} 

type TimelineAreaProps = {
  // children: ReactNode
  time: Date
  name: string
  colour: string
  events: EventDetails[]
} 

export default function TimelineArea ({time, name, colour, events}: TimelineAreaProps) {

  // const start = new Date(time.getTime() - 1000*60*30)
  // const end = new Date(time.getTime() + 1000*60*60)

  return (
    <div className="w-full flex-grow bg-slate-200
      relative">
      <div className="w-0 h-full absolute z-40
        border-red-500 border-2" style={{left: "100px"}}></div>
      {events.map((data, index) => {
        return (
          <TimelineEvent time={time} colour={colour} key={data.name}
          {...data}/>
        )
      })}
    </div>
  )
}