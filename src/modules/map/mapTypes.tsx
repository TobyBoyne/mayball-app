interface MapElementInterface {
  name: string
  shape: {w: number, h: number}
  pos: {x: number, y: number}
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
  elements: MapElementInterface[]
}


export type { MapElementInterface, MapAreaInterface }