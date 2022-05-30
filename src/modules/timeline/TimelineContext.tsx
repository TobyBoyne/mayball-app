// Contains global values for timeline

import { createContext } from "react"

interface TimelineProps {
  scale: number // pixels per ms
  curTimeOffset: number // in ms
  earliest: number
  latest: number
  time: number
}

const TimelineContext = createContext({} as TimelineProps)

export default TimelineContext