/** The entire map.
 * The map contains many MapAreas
 */

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from 'next/image'
import MapArea from "./MapArea";
import { useState } from "react";

const mapElements = [
  {
    name: "area1",
    colour: "bg-blue-500",
    elements: [
      {
        name: "area1el1",
        shape: {h: 100, w: 100},
        pos: {x: 30, y: 30},
        link: "firstsection",
      }
    ]
  }
]


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
          <Image src={"/site_plan.png"} width={mapSize.width} height={mapSize.height}
            alt="Placeholder image for site plan"
            className="relative"
          />

          {mapElements.map((data, index) => {
            return (
              <MapArea key={index} zoom={zoom} {...data} />
            )
          })}
      </TransformComponent>
    </TransformWrapper>
  )
}