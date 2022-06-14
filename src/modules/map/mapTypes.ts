interface MapElementInterface {
  name: string
  shape: string
  width: number
  height: number
  x: number
  y: number
  link?: string
  startTime?: Date
  endTime?: Date
}

interface MapAreaInterface {
  name: string
  shape: string
  colour: string
  capacity: number
  pop: number
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