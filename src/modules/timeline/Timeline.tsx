/** The timeline.
 * The timeline contains many TimelineAreas
 */

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState, useContext, useRef, useCallback } from "react";
 
import TimelineArea from "./TimelineArea";
import TimelineContext from "./TimelineContext";

import { MapDataInterface } from "../map/mapTypes";

// Example data - to be moved to proper file format
// each object should be the same format as TimelineAreaProps
// events object should be the same format as TimelineEventProps
const areaEvents = [
  {
    name: "area1",
    colour: "bg-blue-500",
    events: [{
      name: "area1e1",
      start: "2022-06-23T20:00",
      end: "2022-06-23T23:00"
    }]
  },

  {
    name: "area2",
    colour: "bg-amber-500",
    events: [
      {
      name: "area2e1",
      start: "2022-06-23T21:00",
      end: "2022-06-23T21:45"
    }, {
      name: "area2e2",
      start: "2022-06-23T22:00",
      end: "2022-06-23T23:30"
    }
  ]
  },

  {
    name: "area3",
    colour: "bg-fuchsia-500",
    events: [{
      name: "area3e1",
      start: "2022-06-23T23:30",
      end: "2022-06-24T06:00"
    }]
  },
]

const timelineData = {
  scale: 0.02 / 1000, // pixels per ms
  curTimeOffset: 1000*60*30, // 30 minutes
  earliest: (new Date("2022-06-23T12:00")).getTime(),
  latest: (new Date("2022-06-24T06:00")).getTime(),
}

export default function Timeline ({eventsData}: {eventsData: MapDataInterface[]}) {

  const [time, setTime] = useState((new Date("2022-06-23T23:00")).getTime())
  const timeline = useContext(TimelineContext)
  
//   TODO: make custom hook
//   useEffect(() => {
//     const timer = setInterval(() => { // Creates an interval which will update the current data every minute
//     // This will trigger a rerender every component that uses the useDate hook.
//     setTime(new Date());
//   }, 60 * 1000);
//   return () => {
//     clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
//   }
// }, []);

  // scroll to current position
  const ref = useRef<HTMLDivElement | null>(null)
  const scrollPos = (time - timelineData.earliest - timelineData.curTimeOffset) * timelineData.scale
  console.log(timelineData.earliest)
  const setRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollLeft = scrollPos
    }
    ref.current = node
  }, [])

  // endscroll
  
  const fullWidth = (timelineData.latest - timelineData.earliest) * timelineData.scale
   return (      
        <TimelineContext.Provider value={{...timelineData, time:time}}>
          <div className="w-2/3 overflow-x-scroll" ref={setRef}>
            <div className="flex flex-col gap-3"
              style={{height: 600, width: fullWidth}}>
              {eventsData.map( (data, index) => {
                return (
                <TimelineArea key={index} {...data.attributes}/>
                )
              })}
            </div>
          </div>
        </TimelineContext.Provider>
   )
 }