/** The entire map.
 * The map contains many MapAreas
 */

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from 'next/image'
import MapArea from "./MapArea";
import { useState } from "react";

export default function Map () {
  // State used to record zoom level
  const [zoom, setZoom] = useState(1)

  const mapSize = {
    height: 600, width: 1006
  }

  const typesafeSetZoom = (scale: number | undefined) => {
    if (typeof scale == "number") {
      setZoom(scale)
    }
  } 


  // console.log('ref', ref?.state.scale)
  return (
    <TransformWrapper
      ref={ (ref)=> typesafeSetZoom(ref?.state.scale) }>
      <TransformComponent>
        <div className="">
          <Image src={"/site_plan.png"} width={mapSize.width} height={mapSize.height}
            alt="Placeholder image for site plan">
          </Image>
          <MapArea zoom={zoom}>
          </MapArea>
        </div>
      </TransformComponent>
    </TransformWrapper>
  )
}