/* Function to allow interaction with the map while still allowing panning
 * Only register short clicks (<300ms)
 * With inspiration from https://stackoverflow.com/a/48057286/12126787
 */

import { useState, TouchEvent, MouseEvent } from "react"

function useShortPress (onShortPress: () => any, delay: number = 200) {

  const [timerId, setTimerId] = useState(0)
  const [isLong, setIsLong] = useState(false)

  const start = () => {
    let timer = setTimeout(() => {setIsLong(true)}, delay)
    setTimerId( timer as unknown as number )
  }

  const clear = () => {
    if (!isLong) {
      onShortPress()
    }

    clearTimeout(timerId)
    setIsLong(false)
  }

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onTouchEnd: clear
}

}

export default useShortPress