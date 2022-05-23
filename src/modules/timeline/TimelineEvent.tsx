/** The timeline element.
 * This represents a single event in an area.
 */

 type TimelineEventProps = {
  // children: ReactNode
  time: Date
  colour: string
  name: string
  start: string
  end: string
} 

export default function TimelineEvent ({time, colour, name, start, end}: TimelineEventProps) {
  const scale = 0.02

  const startTime = new Date(start)
  const endTime = new Date(end)

  const offset = 100 + scale * (startTime.getTime() - time.getTime()) / 1000
  const duration = scale * (endTime.getTime() - startTime.getTime()) / 1000

  const style = {
    width: duration,
    left: offset,
    top: 0
  }

  return (
    <div className={`${colour} h-full
      absolute`}
      style={style}
      key={name}>
        <p>{name}</p>
    </div>
  )
}