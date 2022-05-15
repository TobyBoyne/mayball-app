/** A single element of the map (e.g. a food stall).
 * This can have an associated start/end time to indicate when it should appear on the map.
 */

type MapElementProps = {
  position: {x: number, y: number}
  zoom: number
  startTime?: Date
  endTime?: Date
}

export default function MapElement ({position, zoom, startTime, endTime} : MapElementProps) {
  return (
    <div className="absolute top-20 left-40
    bg-emerald-400 h-10 w-10">
      <p className="text-2xs">Element {zoom}</p>
    </div>  
  )
}
