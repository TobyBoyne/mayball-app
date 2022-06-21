/** The timeline.
 * The timeline contains many TimelineAreas
 */

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState, useContext, useRef, useCallback } from "react";
 
import TimelineArea from "./TimelineArea";
import TimelineContext from "./TimelineContext";

import { MapDataInterface } from "../map/mapTypes";

import { getAreaFromSlug } from "../map/fetchMapData";

import styles from "./Timeline.module.css"

const timelineData = {
  scale: 0.05 / 1000, // pixels per ms
  curTimeOffset: 1000*60*30, // 30 minutes
  earliest: (new Date("2022-06-23T19:00")).getTime(),
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

  const clockTicks = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  // endscroll
  
  const fullWidth = (timelineData.latest - timelineData.earliest) * timelineData.scale
   return (      
    <TimelineContext.Provider value={{...timelineData, time:time}}>

      <div className={`${styles.timelineContainer} ${styles.card}`}
        ref={setRef}
      >

        <div className={styles.clock}
          style={{width: fullWidth}}
        >
        {
          clockTicks.map((timeDelta, index) => {
            return (
              // <div>{data}</div>
              <ClockTickMajor key={index} timeDelta={timeDelta} 
              scale={timelineData.scale} earliest={timelineData.earliest}/>
            )
          })
        }

        </div>

        <div className={`${styles.labels}`}>
          <div>Main Stage</div>
          <div>Second Stage</div>
          <div>Acoustic Stage</div>
          <div className={styles.timelineDivider} />
          <div>Hollywood and Vine</div>
          <div>Outdoor Cinema</div>
          <div>Mystery</div>
        </div>

          <div className={`${styles.timeline}`}
            style={{width: fullWidth}}
          >
            <TimelineArea {...getAreaFromSlug(eventsData, "main-stage")}/>
            <TimelineArea {...getAreaFromSlug(eventsData, "second-stage")}/>
            <TimelineArea {...getAreaFromSlug(eventsData, "acoustic-stage")}/>
            
            <TimelineDivider />

            <TimelineArea {...getAreaFromSlug(eventsData, "hollywood-and-vine")}/>
            <TimelineArea {...getAreaFromSlug(eventsData, "the-hollywood-bowl")}/>
            <TimelineArea {...getAreaFromSlug(eventsData, "mystery")}/>
          </div>


      </div>
    </TimelineContext.Provider>
   )
 }

 function TimelineDivider () {
   return (
     <div className={styles.timelineDivider}>

     </div>
   )
 }

 function ClockTickMajor ({timeDelta, scale, earliest}: {timeDelta: number, scale: number, earliest: number}) {
  const timeDeltams = timeDelta * 1000 * 60 * 60
  const timeObj = new Date(earliest + timeDeltams)
  const timeStr = `${String(timeObj.getHours()).padStart(2, "0")}:${String(timeObj.getMinutes()).padStart(2, "0")}`
  const offset = scale * timeDeltams
  return (
    // < div />
    <div
      className={styles.major}
      style={{
        left: offset
      }}
    >
      {timeStr}

    </div>
  )
 }