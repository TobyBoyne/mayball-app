interface MapElementInterface {
  name: string
  description: string
  shape: string
  width: number
  height: number
  x: number
  y: number
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

export type { MapElementInterface, MapAreaInterface, MapDataInterface }