/** The timeline.
 * The timeline contains many TimelineAreas
 */

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState, useEffect } from "react";
 
import TimelineArea from "./TimelineArea";

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

const timeline = {
  scale: 0.02 / 1000, // pixels per ms
  curTimeOffset: 1000*60*30, // 30 minutes
  earliest: (new Date("2022-06-23T19:00")).getTime(),
  latest: (new Date("2022-06-24T06:00")).getTime(),
}

export default function Timeline () {

  const [time, setTime] = useState(new Date("2022-06-23T21:00"))


//   useEffect(() => {
//     const timer = setInterval(() => { // Creates an interval which will update the current data every minute
//     // This will trigger a rerender every component that uses the useDate hook.
//     setTime(new Date());
//   }, 60 * 1000);
//   return () => {
//     clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
//   }
// }, []);
  
  const fullWidth = (timeline.latest - timeline.earliest) * timeline.scale
  console.log(fullWidth)
   return (
    <TransformWrapper minScale={1} maxScale={1}
      initialPositionX={0}>
      <TransformComponent wrapperStyle={{width:600}}>
        <div className="flex flex-col gap-3" 
          style={{height: 600, width: fullWidth}}>
          {areaEvents.map( (data, index) => {
            return (
            <TimelineArea time={time} key={data.name} {...data}/>
            )
          })}
        </div>
      </TransformComponent>
    </TransformWrapper>
   )
 }