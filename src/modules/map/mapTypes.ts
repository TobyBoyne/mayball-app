interface MapElementInterface {
  name: string
  description: string
  shape: string
  width: number
  height: number
  x: number
  y: number
  onTimeline?: boolean
  event_type: {
    data?: {
      id: number
      attributes: {
        name: string
      }
    }
  }
  link?: string
  startTime?: string
  endTime?: string
}

interface MapAreaInterface {
  name: string
  shape: string
  slug: string
  colour: string
  capacity: number
  pop: number
  content: string
  displayName: string
  posterSlug: string
  areaZoomPos: {
    x: number
    y: number
    scale: number
  }
  elements: {data: {
    id: number 
    attributes: MapElementInterface
    }[]
  }
}

interface MapDataInterface {
  id: number
  attributes: MapAreaInterface
}

interface Selection {
  name: string
  description: string
  start: string
  end: string
  x: number
  y: number
}

export type { MapElementInterface, MapAreaInterface, MapDataInterface, Selection }