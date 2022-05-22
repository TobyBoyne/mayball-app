/** The timeline.
 * The timeline contains many TimelineAreas
 */

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
    name: "area1",
    colour: "bg-amber-500",
    events: [{
      name: "area2e2",
      start: "2022-06-23T21:00",
      end: "2022-06-23T21:45"
    },
    {
      name: "area2e2",
      start: "2022-06-23T22:00",
      end: "2022-06-23T23:30"
    }
  ]
  },

  {
    name: "area1",
    colour: "bg-fuchsia-500",
    events: [{
      name: "area3e1",
      start: "2022-06-23T23:30",
      end: "2022-06-24T06:00"
    }]
  },
]



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
 
   return (
     <div className="w-full
      flex flex-col gap-3">
      {areaEvents.map( (data, index) => {
        return (
        <TimelineArea time={time} {...data}/>
        )
      })}
      {/* <TimelineArea colour="bg-blue-500" time={time}/>
      <TimelineArea colour="bg-fuchsia-500" time={time}/>
      <TimelineArea colour="bg-amber-500" time={time}/> */}
     </div>
   )
 }